import { API_URL, URL } from "@/config/config";
import axios from "axios";

const url = `${API_URL}/category`;
const schema = `${API_URL}/schema`;
const seoUrl = `${API_URL}/seo`;

export const getAllCateByDomain = async () => {
  try {
    let res = await axios.get(`${url}/domains?domain=${URL}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCateBySlug = async (slug: string) => {
  try {
    let res = await axios.get(`${url}/${slug}?domain=${URL}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCateBySlugSchema = async (slug: string) => {
  try {
    let res = await axios.get(`${schema}/get-by-slug?slug=${slug}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCateBySlugPost = async (slug: string) => {
  try {
    let res = await axios.get(`${schema}/get-by-slug-post?slug=${slug}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSeoByLink = async (params : any) => {
  
  try {
    let res = await axios.get(`${seoUrl}/getSeoByLink${params}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const convertObjectToQuery = (obj: any) => {
  const keys = Object.keys(obj);
  let query = "?";
  keys.forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== "") {
          query +=
              typeof obj[key] === "string"
                  ? `${key}=${obj[key]}&`
                  : `${key}=${JSON.stringify(obj[key])}&`;
      }
  });
  return query;
};


