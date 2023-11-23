import axios from "axios";
import moment from "moment";
import { API_SABA, API_SPORT } from "@/config/config";
//data Schedule Right
export const getListLeague = async () => {
  try {
    const response = await axios.get(`${API_SPORT}/api/leaguesCupProfile`);
    const resLeague =
      response &&
      response.data.map((item: any, index:number) => {
        return {
          _id: item._id,
          leagueId: item.leagueId,
          logo: item.logo,
          name: item.name,
          shortName: item.shortName,
        };
      });

    return resLeague;
  } catch (error) {}
};

export const getScheduleAndResultByDate = async (date: string) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getScheduleAndResultByDate?date=${date}`
      ); 
      return response.data;
    } catch (error) {}
  };

  //data Left Detail
export const getScheduleAndResultByMatchId = async (matchId: number) => {
  try {
    const response = await axios.get(
      `${API_SPORT}/api/getScheduleAndResultByMatchId?matchId=${matchId}`
    );
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};


  
  export const getListLeagueMenu = async () => {
    try {
      const response = await axios.get(`${API_SPORT}/api/leaguesCupProfile`);
      const resLeague =
        response &&
        response.data.map((item: any, index: number) => {
          return {
            _id: item._id,
            leagueId: item.leagueId,
            logo: item.logo,
            name: item.name,
            shortName: item.shortName,
          };
        });
  
      return resLeague.filter(
        (x: any) =>
          x.leagueId == "1639" ||
          x.leagueId == "13014" ||
          x.leagueId == "1134" ||
          x.leagueId == "188" ||
          x.leagueId == "1437" ||
          x.leagueId == "1112" ||
          x.leagueId == "16679"
      );
    } catch (error) {}
  };

  export const getDataFixtureId = async (matchId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getScheduleAndResultByMatchId?matchId=${matchId}`
      );
      return response.data[0];
    } catch (error) {
      console.log(error);
    }
  };
 

  export const getLiveDataEvents = async (date: string) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getLiveDataEvents?date=${date}`
      );
  
      return response.data[0];
    } catch (error) {}
  };
  
  export const getLiveDataStats = async (date: string) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getLiveDataStats?date=${date}`
      );
  
      return response.data[0];
    } catch (error) {}
  };
  
  export const getLiveDataEventByMatchId = async (matchId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getLiveDataEventByMatchId?matchId=${matchId}`
      );
  
      return response.data[0];
    } catch (error) {}
  };
  
  export const getLiveDataStatByMatchId = async (matchId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getLiveDataStatByMatchId?matchId=${matchId}`
      );
  
      return response.data[0];
    } catch (error) {}
  };
  
  export const getLineUpByMatchId = async (matchId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getLineUp?matchId=${matchId}`
      );
  
      return response.data[0];
    } catch (error) {}
  };
  
  export const getmatchAnalysis = async (matchId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/matchAnalysis?matchId=${matchId}`
      );
      return response.data[0];
    } catch (error) {}
  };
  
  //get data Interested
  export const getFavLeagues = async () => {
    try {
      const body = "[14638,11997,11999,12001,12000,12002,11998,12036,12165]";
  
      const response = await axios({
        method: "post",
        url: `${API_SABA}/soccer/GetFavLeagues`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          leagueIds: body,
        },
      });
  
      return response.data;
    } catch (error) {}
  };
  
  export const getEventByMatchId = async (matchId: number, date: string) => {
    try {
      const result = await axios.get(
        `${API_SPORT}/api/getEventsByMatchId?matchId=${matchId}&date=${date}`
      );
  
      return result.data?.[0] || {};
    } catch (error) {}
  };
  
  export const getComparison1X2 = async (matchId: number) => {
    try {
      const result = await axios.get(
        `${API_SPORT}/api/getEuropeanOdds?matchId=${matchId}`
      );
  
      return result.data?.[0] || {};
    } catch (error) {
      throw error;
    }
  };
  
  export const getMatchesBySeason = async (leagueId: number, seasonId: number) => {
    try {
      const dateTime = moment(new Date()).format("yyyy-MM-DD");
  
      const response = await axios({
        method: "post",
        url: `${API_SABA}/soccer/getMatchesBySeason`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          date: dateTime,
          leagueId: leagueId, //leagueId
          seasonId: seasonId, //seasonId
        },
      });
  
      return response.data;
    } catch (error) {}
  };
  
  export const getSeasonStandings = async (leagueId: number, seasonId: number) => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_SABA}/soccer/getSeasonStandings`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          leagueId: leagueId, //leagueId
          seasonId: seasonId, //seasonId
        },
      });
  
      return response.data;
    } catch (error) {}
  };
  
  export const getScheduleAndResultByLeagueId = async (leagueId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getScheduleAndResultByLeagueId?leagueId=${leagueId}&status=-1`
      );
  
      return response.data;
    } catch (error) {}
  };
  
  export const getStatsByMatchId = async (matchId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getLiveDataStatByMatchId?matchId=${matchId}`
      );
  
      return response.data?.[0] || {};
    } catch (error) {
      throw error;
    }
  };
  
  export const getLeagueStanding = async (leagueId: number, subLeagueId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/leagueStandings?leagueId=${leagueId}&subLeagueId=${subLeagueId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  



