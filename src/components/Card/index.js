import React, { useState } from "react";
import { Link } from "react-router";

const ReadMoreText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  if (text.length <= maxLength) {
    return <p className="text">{text}</p>;
  }

  const displayedText = isExpanded ? text : `${text.slice(0, maxLength)}...`;

  return (
    <p className="text">
      {displayedText}{" "}
      <span
        className="read_more"
        onClick={toggleReadMore}
        style={{ color: "blue", cursor: "pointer" }}
      >
        {isExpanded ? "Свернуть" : "Ары қарай оқу"}
      </span>
    </p>
  );
};

const Card = ({ title, img, link, text, type = "" }) => {
  if (type === "row") {
    return (
      <Link to={`/texts/${link}`} className="card_row card">
        <div className="image_wrapper">
          <img src={img} />
        </div>
        <div className="card_row_text">
          <h5>{title}</h5>
          {/* <ReadMoreText text={text} /> */}
        </div>
      </Link>
    );
  }
  return (
    <Link to={`${link}`} className="card">
      <div className="image_wrapper">
        <img src={img} />
      </div>
      <h5>{title}</h5>
      <ReadMoreText text={text} />
    </Link>
  );
};

export default Card;
