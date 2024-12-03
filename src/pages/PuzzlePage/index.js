import { Alert, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import pasteAudio from "../../audio/onPaste.mp3";
import clickAudio from "../../audio/onSelect.mp3";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { data } from "../PuzzlesPage/index";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(255, 244, 229)",
  boxShadow: 24,
  padding: 2,
  outline: "none",
  border: "none",
  borderRadius: "10px",
  //   transition: ".3s linear",
};
const Puzzle = () => {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/").at(-1);

  const rows = 3;
  const cols = 4;
  const [grid, setGrid] = useState(Array(rows * cols).fill(null));
  const getElem = data.filter((el) => el.link === path)[0];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const imageSrc = getElem.image;

  function generatePuzzlePieces() {
    const pieces = [];
    for (let i = 0; i < rows * cols; i++) {
      pieces.push(i);
    }
    return shuffleArray(pieces);
  }

  const [pieces, setPieces] = useState(generatePuzzlePieces());
  const playSound = useCallback((sound) => {
    const audio = new Audio(sound);
    audio.play();
  }, []);
  const handleDragStart = (index, source) => (event) => {
    playSound(clickAudio);
    event.dataTransfer.setData("pieceIndex", index.toString());
    event.dataTransfer.setData("source", source);
  };
  const handleClose = () => setOpen(false);

  const handleDrop = (targetIndex, target) => (event) => {
    playSound(pasteAudio);

    const pieceIndex = parseInt(event.dataTransfer.getData("pieceIndex"));
    const source = event.dataTransfer.getData("source");

    const newGrid = [...grid];
    const newPieces = [...pieces];

    if (source === "pieces" && target === "grid") {
      // Перемещение из области `pieces` в `grid`
      if (newGrid[targetIndex] === null) {
        newGrid[targetIndex] = pieces[pieceIndex];
        newPieces[pieceIndex] = null;
      }
    } else if (source === "grid" && target === "pieces") {
      // Перемещение из `grid` обратно в `pieces`
      if (newPieces[pieceIndex] === null) {
        newPieces[pieceIndex] = grid[targetIndex];
        newGrid[targetIndex] = null;
      }
    } else if (source === "grid" && target === "grid") {
      // Обмен местами внутри `grid`
      [newGrid[pieceIndex], newGrid[targetIndex]] = [
        newGrid[targetIndex],
        newGrid[pieceIndex],
      ];
    }

    setGrid(newGrid);
    setPieces(newPieces);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const restartGame = () => {
    // Сброс состояния
    setGrid(Array(rows * cols).fill(null));
    setPieces(generatePuzzlePieces());
  };

  const isPuzzleSolved = grid.every((piece, index) => piece === index);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (isPuzzleSolved) {
      handleOpen();
    }
  }, [isPuzzleSolved]);
  return (
    <div>
      <Header />
      <div className="puzzle-page">
        <div className="container">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Құттықтаймын! Пазлды дұрыс жинадыңыз
              </Typography> */}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="modal_puzzle_wrapper">
                  <img src={getElem?.qr} alt="pic" />
                </div>
              </Typography>
            </Box>
          </Modal>

          <div className="puzzle-header-elem">
            <div className="left-elem">
              <h1>Пазл ойыны</h1>
              <Alert style={{ marginBottom: "20px" }} severity="info">
                Сол жақтағы суреттің карточкаларын тінтуірмен басып тұру арқылы
                жылжытып, оң жақтағы ұяшықтарға жинау қажет. Суретті ұяшықта
                дұрыс жинаған жағдайда кейіпкер жайлы мультфильмнің QR коды
                шығады
              </Alert>
              <Alert severity="warning">
                Ескерту: бетті қайтадан жүктеген (обновление) жағдайда ойын
                басынан басталады
              </Alert>
            </div>
            <div className="right-elem">
              {" "}
              <img className="example-image" src={imageSrc} alt="puzzle" />
            </div>
          </div>
          <button className="puzzle-restart" onClick={restartGame}>
            Басынан бастау
          </button>
          <div className="puzzle-container">
            <div className="pieces">
              {pieces.map((piece, index) =>
                piece !== null ? (
                  <div
                    key={index}
                    className="piece"
                    draggable
                    onDragStart={handleDragStart(index, "pieces")}
                    onDrop={handleDrop(index, "pieces")}
                    onDragOver={handleDragOver}
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: `${cols * 100}% ${rows * 100}%`,
                      backgroundPosition: `${
                        (piece % cols) * (100 / (cols - 1))
                      }% ${Math.floor(piece / cols) * (100 / (rows - 1))}%`,
                    }}
                  />
                ) : (
                  <div key={index} className="empty-piece" />
                )
              )}
            </div>
            {/* Сетка */}
            <div
              style={{
                gridTemplateColumns: `repeat(${cols}, 130px)`,
                gridTemplateRows: `repeat(${rows}, 130px)`,
              }}
              className="grid"
            >
              {grid.map((piece, index) => (
                <div
                  key={index}
                  className="grid-cell"
                  draggable={piece !== null}
                  onDragStart={
                    piece !== null ? handleDragStart(index, "grid") : undefined
                  }
                  onDrop={handleDrop(index, "grid")}
                  onDragOver={handleDragOver}
                  style={{
                    backgroundImage:
                      piece !== null ? `url(${imageSrc})` : undefined,
                    backgroundSize: `${cols * 100}% ${rows * 100}%`,
                    backgroundPosition:
                      piece !== null
                        ? `${(piece % cols) * (100 / (cols - 1))}% ${
                            Math.floor(piece / cols) * (100 / (rows - 1))
                          }%`
                        : undefined,
                  }}
                />
              ))}
            </div>
          </div>
          {/* <div className="alerts">
            <Alert severity="warning">
              Ескерту: бетті қайтадан жүктеген (обновление) жағдайда ойын
              басынан басталады
            </Alert>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Puzzle;
