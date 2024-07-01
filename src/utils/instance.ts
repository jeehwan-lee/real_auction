import axios from "axios";

const defaultAPI = (url: string, options?: any) => {
  return axios.create({ baseURL: url, ...options });
};

const authAPI = (url: string, options?: any) => {
  const token = localStorage.getItem("accessToken");

  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
};

export const defaultInstance = defaultAPI(process.env.REACT_APP_BASE_URL);
export const autnInstance = authAPI(process.env.REACT_APP_BASE_URL);
