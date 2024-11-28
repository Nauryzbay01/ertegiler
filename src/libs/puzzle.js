import React, { useCallback, useEffect, useRef, useState } from "react";
import pasteSound from "../audio/onPaste.mp3";
import successSound from "../audio/onSelect.mp3";

const JigsawPuzzle = ({
  imageSrc,
  rows = 3,
  columns = 4,
  onSolved = () => {},
}) => {
  const [tiles, setTiles] = useState([]);
  const [imageSize, setImageSize] = useState(null);
  const [rootSize, setRootSize] = useState(null);
  const [calculatedHeight, setCalculatedHeight] = useState(null);
  const [draggedTile, setDraggedTile] = useState(null);
  const [draggingPos, setDraggingPos] = useState({ x: 0, y: 0 });

  const rootElement = useRef(null);
  const resizeObserver = useRef(null);
  const isInitialized = useRef(false);
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
    return;
  };
  const TILE_COUNT = rows * columns; // Количество плиток (6 элементов)

  // Функция для случайного перемешивания плиток
  const shuffleTiles = (tiles) => {
    const shuffledTiles = [...tiles];
    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [
        shuffledTiles[j],
        shuffledTiles[i],
      ];
    }
    return shuffledTiles;
  };
  // Инициализация плиток
  // const initializeTiles = useCallback((image) => {
  //   if (!isInitialized.current) {
  //     const newTiles = Array.from({ length: TILE_COUNT }, (_, index) => ({
  //       correctPosition: index,
  //       tileHeight: image.height / rows,
  //       tileWidth: image.width / columns,
  //       tileOffsetX: (index % columns) * (image.width / columns),
  //       tileOffsetY: Math.floor(index / columns) * (image.height / rows),
  //       currentPosXPerc: 0, // Начальная позиция плиток в строке
  //       currentPosYPerc: 1, // Все плитки снизу, за пределами зоны сбора
  //       solved: false,
  //       isDragging: false,
  //     }));

  //     // Расположение плиток в одну строку снизу, для 6 элементов
  //     const newTilesWithPosition = newTiles.map((tile, index) => ({
  //       ...tile,
  //       currentPosXPerc: (index / TILE_COUNT) * 1, // Располагаем плитки в пределах одной строки
  //       currentPosYPerc: 1, // Все плитки снизу, вне зоны для сбора
  //     }));

  //     setTiles(shuffleTiles(newTilesWithPosition));

  //     isInitialized.current = true;
  //   }
  // }, []);
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  const initializeTiles = useCallback((image) => {
    if (!isInitialized.current) {
      const newTiles = Array.from({ length: TILE_COUNT }, (_, index) => ({
        correctPosition: index,
        tileHeight: image.height / rows,
        tileWidth: image.width / columns,
        tileOffsetX: (index % columns) * (image.width / columns),
        tileOffsetY: Math.floor(index / columns) * (image.height / rows),
        currentPosXPerc: 0, // Начальная позиция плиток
        currentPosYPerc: 1, // Все плитки снизу
        solved: false,
        isDragging: false,
      }));

      // Распределяем плитки на 2 строки внизу
      const halfCount = Math.ceil(TILE_COUNT / 2); // Количество плиток в одной строке
      const shuffledTiles = shuffle(newTiles);
      const newTilesWithPosition = shuffledTiles.map((tile, index) => ({
        ...tile,
        currentPosXPerc: (index % halfCount) / (halfCount - 2), // Плитки равномерно по ширине
        currentPosYPerc: 1 + Math.floor(index / halfCount) * (1 / rows), // Две строки внизу
      }));

      setTiles(shuffleTiles(newTilesWithPosition));
      isInitialized.current = true;
    }
  }, []);

  // Загрузка изображения
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageSize({ width: image.width, height: image.height });

      if (rootSize) {
        setCalculatedHeight((rootSize.width / image.width) * image.height);
      }

      initializeTiles(image);
    };
    image.src = imageSrc;
  }, [imageSrc, rootSize, initializeTiles]);

  // Обработка изменения размера корневого элемента
  const onRootElementResized = useCallback(
    (entries) => {
      const contentRect = entries[0]?.contentRect;
      if (contentRect) {
        setRootSize({ width: contentRect.width, height: contentRect.height });

        if (imageSize) {
          setCalculatedHeight(
            (contentRect.width / imageSize.width) * imageSize.height
          );
        }
      }
    },
    [imageSize]
  );

  // Установка ResizeObserver
  useEffect(() => {
    if (rootElement.current) {
      const observer = new ResizeObserver(onRootElementResized);
      observer.observe(rootElement.current);
      resizeObserver.current = observer;

      const { offsetWidth, offsetHeight } = rootElement.current;
      setRootSize({ width: offsetWidth, height: offsetHeight });

      if (imageSize) {
        setCalculatedHeight((offsetWidth / imageSize.width) * imageSize.height);
      }

      return () => observer.disconnect();
    }
  }, [onRootElementResized, imageSize]);

  // Логика перетаскивания
  const handleMouseDown = (e, tile) => {
    playSound(successSound);
    e.preventDefault();
    setDraggedTile(tile);
    setDraggingPos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggedTile) return;

    const deltaX = e.clientX - draggingPos.x;
    const deltaY = e.clientY - draggingPos.y;

    setDraggingPos({
      x: e.clientX,
      y: e.clientY,
    });

    const newTiles = [...tiles];
    const index = newTiles.findIndex(
      (tile) => tile.correctPosition === draggedTile.correctPosition
    );

    if (index !== -1) {
      newTiles[index] = {
        ...newTiles[index],
        currentPosXPerc:
          (newTiles[index].currentPosXPerc * rootSize.width + deltaX) /
          rootSize.width,
        currentPosYPerc:
          (newTiles[index].currentPosYPerc * rootSize.height + deltaY) /
          rootSize.height,
      };
      setTiles(newTiles);
    }
  };

  const handleMouseUp = () => {
    if (!draggedTile) return;

    const newTiles = [...tiles];
    const index = newTiles.findIndex(
      (tile) => tile.correctPosition === draggedTile.correctPosition
    );

    if (index !== -1) {
      // Добавляем корректировку позиции плитки на место
      const tile = newTiles[index];
      const correctPosX =
        (tile.correctPosition % columns) * (rootSize.width / columns);
      const correctPosY =
        Math.floor(tile.correctPosition / columns) * (rootSize.height / rows);

      const tolerance = 20; // Допуск для корректировки
      if (
        Math.abs(tile.currentPosXPerc * rootSize.width - correctPosX) <
        tolerance
      ) {
        tile.currentPosXPerc = correctPosX / rootSize.width;
      }

      if (
        Math.abs(tile.currentPosYPerc * rootSize.height - correctPosY) <
        tolerance
      ) {
        tile.currentPosYPerc = correctPosY / rootSize.height;
      }

      newTiles[index] = { ...tile, isDragging: false };
    }
    playSound(pasteSound);
    setTiles(newTiles);
    setDraggedTile(null);

    // Проверка правильности сборки пазла
    checkIfSolved(newTiles);
  };

  // Функция для проверки, решен ли пазл
  const checkIfSolved = (tiles) => {
    const isSolved = tiles.every((tile) => {
      const correctPosX =
        (tile.correctPosition % columns) * (rootSize.width / columns);
      const correctPosY =
        Math.floor(tile.correctPosition / columns) * (rootSize.height / rows);
      return (
        Math.abs(tile.currentPosXPerc * rootSize.width - correctPosX) < 10 &&
        Math.abs(tile.currentPosYPerc * rootSize.height - correctPosY) < 10
      );
    });

    if (isSolved) {
      onSolved(); // Вызов функции при решении пазла
    }
  };

  return (
    <div
      ref={rootElement}
      className="jigsaw-puzzle"
      style={{ height: calculatedHeight ? `${calculatedHeight}px` : undefined }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {tiles.map((tile) => (
        <div
          key={tile.correctPosition}
          className={`jigsaw-puzzle__piece ${
            tile.isDragging ? "dragging" : ""
          }`}
          style={{
            position: "absolute",
            height: `${(1 / rows) * 100}%`,
            width: `${(1 / columns) * 100}%`,
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: `${rootSize?.width}px ${rootSize?.height}px`,
            backgroundPositionX: `${
              ((tile.correctPosition % columns) / (columns - 1)) * 100
            }%`,
            backgroundPositionY: `${
              (Math.floor(tile.correctPosition / columns) / (rows - 1)) * 100
            }%`,
            left: `${tile.currentPosXPerc * (rootSize?.width || 0)}px`,
            top: `${tile.currentPosYPerc * (rootSize?.height || 0)}px`,
          }}
          onMouseDown={(e) => handleMouseDown(e, tile)}
        />
      ))}
    </div>
  );
};

export default JigsawPuzzle;
