import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import aldar from "../../audio/aldar-boyau.jpeg";
import aldar2 from "../../audio/aldar-boyau2.jpeg";
import asyk from "../../audio/asyk3.png";
import ertostik from "../../audio/er-tostik-boyau.jpeg";
import ertostik2 from "../../audio/er-tostik-boyau2.jpeg";
import khaiuanattar from "../../audio/khaiuanattar-boyau.jpeg";
import khaiuanattar2 from "../../audio/khaiuanattar-boyau2.jpeg";
import maqtaqyz from "../../audio/maqta-kyz-boyau.jpeg";
import maqtaqyz2 from "../../audio/maqta-qyz-boyau2.jpeg";
import qarlygash from "../../audio/qarlygash-boyau.jpeg";
import qarlygash2 from "../../audio/qarlygash-boyau2.jpeg";
import qrAldar from "../../audio/qr-aldar.png";
import qrErtostik from "../../audio/qr-er-tostik.png";
import qrKhaiuanattar from "../../audio/qr-khaiuanattar.png";
import qrMaqtaqyz from "../../audio/qr-maqta-qyz.png";
import qrQarlygash from "../../audio/qr-qarlygash.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "rgb(255, 244, 229)",
  boxShadow: 24,
  padding: 2,
  display: "flex",
  outline: "none",
  border: "none",
  borderRadius: "10px",
  //   transition: ".3s linear",
};
const style2 = {
  padding: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,

  width: 800,
};
export const data = [
  {
    clicked: false,
    image: aldar,
    title: "Алдар Көсе",
    image2: aldar2,
    qr: qrAldar,
    videosrc: "https://www.youtube.com/embed/NkxPHVIZfig?si=AJnQYWFgyd9pS6cj",
    index: 1,
  },
  {
    clicked: false,
    image: ertostik,
    image2: ertostik2,
    title: "Ер Төстік",
    qr: qrErtostik,
    videosrc: "https://www.youtube.com/embed/uu4zOAaYYtA?si=MoseVTtSHqLuY7Ns",
    index: 2,
  },
  {
    clicked: false,
    image: maqtaqyz2,
    image2: maqtaqyz,
    title: "Мақта қыз",
    qr: qrMaqtaqyz,
    videosrc: "https://www.youtube.com/embed/RWMpJUhvic8?si=h-mQn_p4FRaSEM-6",
    index: 3,
  },
  {
    clicked: false,
    image: qarlygash,
    title: "Қарлығаштың құйрығы неге айыр",
    image2: qarlygash2,
    videosrc: "https://www.youtube.com/embed/ZkBfEFv34mo?si=bO3lgkrqD1NJzV7p",
    qr: qrQarlygash,

    index: 4,
  },
  {
    clicked: false,
    image: khaiuanattar,
    image2: khaiuanattar2,
    qr: qrKhaiuanattar,
    title: "Жыл басына таласқан хайуанаттар",
    videosrc: "https://www.youtube.com/embed/l3pn1RZSMSk?si=tuCb2bkEbT2_8DZs",
    index: 5,
  },
  //   {
  //     clicked: false,
  //     index: 6,
  //   },
  //   {
  //     clicked: false,
  //     index: 7,
  //   },
];
function ChildModal({ videoSrc, qrSrc }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <button className="qr-button" onClick={handleOpen}>
        <div className="modal_image_wrapper qr">
          {" "}
          <img src={qrSrc} />
        </div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style2, width: 700 }}>
          <iframe
            width="760"
            height="400"
            src={videoSrc}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
const Asyk = () => {
  const [dataArr, setDataArr] = useState(data);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (id) => {
    setOpen(true);
    const current = dataArr.find((el) => el.index === id);
    setCurrentItem(current);
    const updatedData = dataArr.map((el) =>
      el.index === id ? { ...el, clicked: !el.clicked } : el
    );
    setDataArr(updatedData);
  };
  return (
    <>
      <Header />
      <div className="asyk_page">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="modal_image_wrapper">
                <img src={currentItem?.image} />
              </div>
            </Typography>
            <ChildModal
              videoSrc={currentItem.videosrc}
              qrSrc={currentItem.qr}
            />
          </Box>
        </Modal>
        <div className="container">
          <div className="asyk_page_content">
            <div className="asyk_wrapper">
              {dataArr.map((el) => (
                <div
                  onClick={() => handleClick(el.index)}
                  className={`asik_item ${el.clicked ? "clicked" : ""}`}
                >
                  <span>{el.index}</span>
                  <img src={asyk} />
                </div>
              ))}
            </div>
            <div className="info">
              <h1>Асық ойыны</h1>
              <Alert style={{ marginBottom: "30px" }} severity="info">
                Кез келген асықты бассаңыз ертегі кейіпкерінің суреті мен QR
                шығады. QR бассаңыз сол кейіпкер жайлы мультфильм көруге болады.
              </Alert>
              <Alert severity="warning">
                Ескерту: бетті қайтадан жүктеген (обновление) жағдайда ойын
                басынан басталады
              </Alert>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Asyk;
