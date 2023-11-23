import { API_URL, URL } from "@/config/config";
import axiosInstance from ".";

const url = `${API_URL}/discussion`;

export const createDiscussion = (data: any) => {
  return axiosInstance.post(`${url}`, data);
};

export const getByIdDiscusion = (id: any) => {
  return axiosInstance.get(`${url}/get-by-group-bai-viet/${id}`);
};

export const getDisscussionByGroupBaiVietTip = (id: any) => {
  return axiosInstance.get(`${url}/get-by-group-bai-viet-tips/${id}`);
};
