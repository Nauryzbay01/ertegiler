import Cards from "../../components/Cards";
const MainPage = () => {
  let date = new Date();
  function getMonth(date) {
    if (date + 1 < 10) {
      return `0${date + 1}`;
    } else {
      return date + 1;
    }
  }
  function getDate(date) {
    if (date < 10) {
      return `0${date}`;
    } else {
      return date;
    }
  }
  let fullDate = `${date.getFullYear()}-${getMonth(date.getMonth())}-${getDate(
    date.getDate()
  )}`;
  return (
    <div className="container">
      <div className="page__wrapper">
        <Cards date={fullDate} />
      </div>
    </div>
  );
};

export default MainPage;
