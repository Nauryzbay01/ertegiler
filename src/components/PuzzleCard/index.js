import React from "react";
import { Link } from "react-router";

const PuzzleCard = ({ title, img, link }) => {
  return (
    <Link to={`${link}`} className="puzzle_card">
      <div className="puzzle_image_wrapper">
        <img src={img} alt="pic" />
      </div>
      <h5>{title}</h5>
    </Link>
  );
};

export default PuzzleCard;
