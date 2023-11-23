import { API_URL, URL } from "@/config/config";
import axios from "axios";
import { IUser } from "@/interface";
import axiosInstance from ".";

interface ILogin {
  token: string;
  user: IUser;
}

export const googleLogin = async (token: string): Promise<ILogin | void> => {
  try {
    let res = await axios.post(`${API_URL}/customer/login-with-google`, {
      token,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginNormal = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    let res = await axios.post(`${API_URL}/customer/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const result = await axiosInstance.get(`${API_URL}/customer/get-user-info`);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const result = await axios.post(`${API_URL}/customer/sign-up`, {
      email,
      password,
    });
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changePassword = async ({
  password,
  newPassword,
}: {
  password: string;
  newPassword: string;
}) => {
  try {
    const result = await axiosInstance.post(
      `${API_URL}/customer/change-password`,
      { password, newPassword }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserFollow = async (
  pageIndex: any,
  pageSize: any,
  search: string
) => {
  try {
    const result = await axiosInstance.get(
      `${API_URL}/customer/getUserFollow?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUserGroup = async (data: any) => {
  try {
    const result = await axiosInstance.post(
      `${API_URL}/customer/createUserGroup`,
      data
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllCustomerPost = async (id: string) => {
  try {
    const result = await axiosInstance.get(
      `${API_URL}/customer/get-customer-posts/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getUserGroupId = async (groupId: any, search: any) => {
  try {
    const result = await axiosInstance.get(
      `${API_URL}/customer/get-group-id?groupId=${groupId}&search=${search}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getInfoUserById = async (userID: string) => {
  try {
    const result = await axios.get(`${API_URL}/customer/${userID}`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserFollows = async (userID: string) => {
  try {
    const result = await axios.get(`${API_URL}/customer/getUserFollow`);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUserFollows = async (data: string) => {
  try {
    const result = await axios.post(
      `${API_URL}/customer/create-user-follow`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserFollows = async (data: string) => {
  try {
    const result = await axios.post(
      `${API_URL}/customer/delete-user-follow`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserGroup = async (data: any) => {
  try {
    const result = await axios.post(
      `${API_URL}/customer/delete-user-group`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserTotalPost = async (data: any) => {
  try {
    const result = await axiosInstance.post(
      `${API_URL}/customer/get-user-count-post`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getGroupInfo = async () => {
  try {
    const result = await axiosInstance.get(
      `${API_URL}/customer/getGroupFollow`
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};
