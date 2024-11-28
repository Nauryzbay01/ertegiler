import React from "react";
import { Link } from "react-router";
import logo from "../../audio/logo2.png";
const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <ul>
          <li>
            <Link to="/texts" className="">
              Ертегілер
            </Link>
          </li>
          <li>
            <Link to="/puzzles" className="">
              Пазл ойыны
            </Link>
          </li>
          <li>
            <Link to="/" className="">
              <img src={logo} />
            </Link>
          </li>
          <li>
            <Link to="/asyk-oiyny" className="">
              Асық ойыны
            </Link>
          </li>
          <li>
            <Link to="/paint" className="">
              Кейіпкерлерді бояу
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;