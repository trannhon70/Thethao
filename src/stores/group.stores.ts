import { API_URL, URL } from "@/config/config";
import axios from "axios";
import axiosInstance from ".";
import { IGroup } from "@/interface";

export const getAllGroup = async ():Promise<IGroup[]> => {
    try {
        const result = await axios.get(`${API_URL}/group/get-all`)
        return result.data?.groups
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getByIdGroup = async (id : any):Promise<IGroup[]> => {
    try {
        const result = await axios.get(`${API_URL}/group/get-byId/${id}`)
        return result.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllGroupTipDiscussionId = async (data : any) => {
    try {
        const result = await axios.post(`${API_URL}/group/get_all_group`,data)
        return result.data?.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllGroupIdTips = async (data : any) => {
    try {
        const result = await axios.post(`${API_URL}/group/get_all_group_tips`,data)
        return result.data?.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllGroupIdDiscus = async (data : any) => {
    try {
        const result = await axios.post(`${API_URL}/group/get_all_group_discus`,data)
        return result.data?.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getAllGroupIdToExclude = async (groupId : any) => {
    try {
        const result = await axios.get(`${API_URL}/group/get-all-to-exclude?groupId=${groupId}`)
        return result.data?.data
    } catch (error) {
        console.log(error)
        throw error
    }
}




