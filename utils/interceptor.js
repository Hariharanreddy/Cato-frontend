import axios from "axios";
import { Cookies } from "@react-native-cookies/cookies";

// Set up Axios instance
const axiosInstance = axios.create({
  baseURL: "https://your-api-url.com",
  withCredentials: true, // This tells Axios to include cookies
});

// Add a request interceptor to handle cookies
axiosInstance.interceptors.request.use(
  async (config) => {
    // Load cookies for the request URL
    const cookies = await Cookies.get(config.url);
    if (cookies) {
      config.headers.Cookie = cookies;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to store cookies
axiosInstance.interceptors.response.use(
  async (response) => {
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      // Parse and store cookies
      await Cookies.set(response.config.url, setCookieHeader);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
