import axios from "axios";
const carmela = "http://192.168.0.73:3001/api";


export const URLBase = axios.create({
    baseURL: carmela
})


