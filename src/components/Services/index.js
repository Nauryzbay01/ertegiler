export const getCards = async (date) => {
  console.log(date);
  try {
    const response = await fetch(
      `https://api.kino.kz/sessions/v1/cinema/sessions?cinema_id=99&date=${date}&filter_by=halls`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log(date);
    return result;
  } catch (err) {
    return;
  }
};
