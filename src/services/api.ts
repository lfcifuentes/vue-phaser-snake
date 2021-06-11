import axios, { AxiosInstance, AxiosResponse } from "axios";

const API = {
  // eslint-disable-next-line
  install(Vue: { prototype: { $api: {}; $axios: AxiosInstance } }): void {
    const baseURL =
      process.env.VUE_APP_API_BASE_URL || "http://localhost:8000/";

    const instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    Vue.prototype.$api = {
      // eslint-disable-next-line
      getUser(data: any): Promise<AxiosResponse<any>> {
        return instance.post("users/", data);
      },
      // eslint-disable-next-line
      setScore(id: string, params: any): Promise<AxiosResponse<any>> {
        return instance.post(`users/${id}/score`, params);
      },
      // eslint-disable-next-line
      getBestScores(): Promise<AxiosResponse<any>> {
        return instance.get("users/best-scores");
      },
    };

    Vue.prototype.$axios = instance;
  },
};
export default API;
