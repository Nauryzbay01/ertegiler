import React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { data } from "../AsykGamePage/index";

const PaintPage = () => {
  const handleImageDownload = (imageSrc, fileName) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = fileName; // Имя файла, с которым будет скачана картинка
    link.click();
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="paint-title">Бояуға арналған каталог</h1>
        <div className="paint_wrapper">
          {data.map((el, index) => {
            return (
              <div className="paint-card-wrapper" key={index}>
                <button
                  onClick={() =>
                    handleImageDownload(el.image2, `${el.title}.jpg`)
                  }
                  className="dnl-button"
                >
                  Жүктеу
                </button>
                <div className="paint_card">
                  {/* Первая картинка */}
                  <img src={el.image} alt={`paint_${index}_1`} />
                  {/* Вторая картинка с обработчиком клика */}
                  <img
                    src={el.image2}
                    alt={`paint_${index}_2`}
                    onClick={() =>
                      handleImageDownload(el.image2, `${el.title}.jpg`)
                    }
                    className="dn-image"
                    style={{ cursor: "pointer" }} // Указатель для интерактивности
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaintPage;
