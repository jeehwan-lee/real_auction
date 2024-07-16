import axios from "axios";

const defaultAPI = (url: string, options?: any) => {
  return axios.create({ baseURL: url, ...options });
};

const authAPI = (url: string, options?: any) => {
  const instance = axios.create({ baseURL: url, ...options });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultInstance = defaultAPI(process.env.REACT_APP_BASE_URL);
export const authInstance = authAPI(process.env.REACT_APP_BASE_URL);
