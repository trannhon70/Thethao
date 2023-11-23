import axios from "axios";

const URL = "https://isports.thethao789.com/api";
export const getTournaments = async () => {
  try {
    const response = await axios.get(`${URL}/leaguesCupProfile`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const getTotalMatchByDate = async (date: string) => {
  try {
    const response = await axios.get(
      `${URL}/getScheduleAndResultByDate?date=${date}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
