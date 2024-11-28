// import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import { Link } from "react-router";
import style from "./main-page.module.css";
const MainPage = () => {
  return (
    <div className={style.page__wrapper}>
      <div className={style.wrapper}>
        <div className={style.left}></div>
        <div className={style.right}>
          <h1>Қазақ ертегілері</h1>
          <div className={style.buttons}>
            <Link className={style.button} to="/puzzles">
              Пазл ойыны
            </Link>
            <Link className={style.button} to="/texts">
              Ертегі оқу
            </Link>
            <Link className={style.button} to="/asyk-oiyny">
              Асық ойыны
            </Link>
            <Link className={style.button} to="/paint">
              Кейіпкерлерді бояу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
