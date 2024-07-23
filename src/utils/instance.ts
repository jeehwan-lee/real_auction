import axios from "axios";

const defaultAPI = (url: string, options?: any) => {
  return axios.create({ baseURL: url, ...options });
};

const authAPI = (url: string, options?: any) => {
  const instance = axios.create({ baseURL: url, ...options });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem("refreshToken");
      const loggedUser = localStorage.getItem("loggedUser");

      if (error.response.status === 401 && refreshToken && loggedUser) {
        try {
          const response = await axios.post(
            process.env.REACT_APP_BASE_URL + "/auth/accesstoken",
            {
              refreshToken: refreshToken,
              user: JSON.parse(loggedUser),
            }
          );

          const newAccessToken = response.data.accessToken;

          localStorage.setItem("accessToken", newAccessToken);
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("loggedUser");

          alert("세션이 만료되었습니다. 다시 로그인해주세요.");

          window.location.href = "/login";

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultInstance = defaultAPI(process.env.REACT_APP_BASE_URL);
export const authInstance = authAPI(process.env.REACT_APP_BASE_URL);
