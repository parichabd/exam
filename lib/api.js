import axios from "axios";
import { getCookie, setCookie } from "@/utils/cookie";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await getNewTokens();

        if (res?.response?.status === 200) {
          const { accessToken, refreshToken } = res.response.data;

          setCookie("accessToken", accessToken, 1 / 24);
          setCookie("refreshToken", refreshToken, 7);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (e) {
        toast.error("خطا در تمدید مجوز ورود٬ لطفاً دوباره وارد شوید.", {
          position: "top-right",
          duration: 4000,
        });
      }

      setCookie("accessToken", "", 0);
      setCookie("refreshToken", "", 0);
      window.location.href = "/login";
    }

    return Promise.reject(error.response?.data ?? error);
  },
);

export default api;

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      { refreshToken },
    );
    return { response };
  } catch (error) {
    return { error };
  }
};
