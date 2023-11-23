import { Discuss, SuccessApi } from "@/interface/discussion";
import axiosInstance from ".";

export const getGroupDiscussion = async (id: string) => {
  const result = await axiosInstance.get(`/discussion/get-by-group/${id}`);
  if (!(result.status === 200))
    throw new Error("Can not fetch group discussion");
  return result;
};
