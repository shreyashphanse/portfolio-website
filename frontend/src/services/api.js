import axios from "axios";

const api = axios.create({
  baseURL: "https://portfolio-backend-t60l.onrender.com/api",
});

export default api;
