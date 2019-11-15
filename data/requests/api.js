import axios from "axios";
import { APP_URL } from "consts";

const instance = axios.create({
  baseURL: APP_URL,
  method: "GET"
});

const request = async config =>
  instance.request({
    ...config
  });

export default request;
