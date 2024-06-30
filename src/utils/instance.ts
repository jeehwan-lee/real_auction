import axios from "axios";

const defaultAPI = (url: string, options?: any) => {
  console.log(process.env.REACT_APP_BASE_URL);
  return axios.create({ baseURL: url, ...options });
};

const authAPI = (url: string, options?: any) => {
  const token = "dddd";

  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `bearer ${token}`,
    },
    ...options,
  });
};

export const defaultInstance = defaultAPI(
  process.env.REACT_APP_BASE_URL as string
);
export const autnInstance = authAPI(process.env.REACT_APP_BASE_URL as string);
