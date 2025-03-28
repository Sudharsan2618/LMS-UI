import axios from "axios";

const api = axios.create({
  baseURL: "http://54.209.80.251:5000/api",
});

export default api;
