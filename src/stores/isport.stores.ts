import { API_SPORT } from "@/config/config"
import axios from "axios"

export const getPrematchAndInplayOddsByMatchId = async (matchId: number) => {
    try {
        const result = await axios.get(`${API_SPORT}/api/getPrematchAndInPlayOdd?matchId=${matchId}`)
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getScheduleAndResultByDate = async (date: string) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getScheduleAndResultByDate?date=${date}` 
        // 2023-04-20
      );
      return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
  };

  export const getScheduleAndResultByMatchId = async (matchId: number) => {
    try {
      const response = await axios.get(
        `${API_SPORT}/api/getScheduleAndResultByMatchId?matchId=${matchId}` 
        // 2023-04-20
      );
      return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
  };