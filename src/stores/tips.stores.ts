import { API_URL, URL } from "@/config/config";
import axiosInstance from ".";
import { IUser } from "@/interface";
import axios from "axios";

const url = `${API_URL}/tips`;

export const createTips = (data: any) => {
  return axiosInstance.post(`${url}`, data);
};

export const getPaging = (pageSize: any, pageIndex: any, search: any) => {
  return axiosInstance.get(
    `${url}/getPaging?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}`
  );
};

export const getUserFollow = () => {
  return axiosInstance.get(`${url}/getUserFollow`);
};
export const getLikesTips = (tipId: string) => {
  return axiosInstance.get(`${url}/getlikePost?tipId=${tipId}`);
};
export const postLike = ({ user, tipId }: { user: IUser; tipId: string }) => {
  return axiosInstance.post(`${url}/likePost`, { user, tipId });
};

export const getRelatedListTip = (tipId: any) => {
  return axiosInstance.get(`${url}/related-list?tipId=${tipId}`);
};

export const getAllPostUser = (userId: any) => {
  return axiosInstance.get(`${url}/getAllPostUser?userId=${userId}`);
};
export const createView = (body: any) => {
  return axiosInstance.post(`${url}/create-view`, body);
};
