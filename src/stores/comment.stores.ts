import { API_URL, URL } from "@/config/config";
import { IUser } from "@/interface";
import axiosInstance from ".";

export const createComment = async (data: string) => {
  try {
    const result = await axiosInstance.post(`${API_URL}/comment/create`, data);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getComment = async (post: string) => {
  try {
    const result = await axiosInstance.get(`${API_URL}/comment?post=${post}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};


export const createLikeComment = async (data: string) => {
  try {
    const result = await axiosInstance.post(`${API_URL}/comment/create-like`, data);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const RemoveComment = async (id: any) => {
  try {
    const result = await axiosInstance.delete(`${API_URL}/comment/delete/${id}`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};