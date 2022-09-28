import Card from "../Card";
import { getCards } from "../Services";
import { useEffect } from "react";
const Cards = ({ date }) => {
  console.log(date);
  const handleCompany = async () => {
    const response = await getCards(date);
    console.log(response);
  };
  useEffect(() => {
    handleCompany();
  }, []);

  return <div className="cards__wrapper"></div>;
};

export default Cards;
