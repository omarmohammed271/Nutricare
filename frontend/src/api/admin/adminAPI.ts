import { axiosInstance } from "../axiosInstance";

export const getEquations = async () => {
    return axiosInstance.get("api/nutritions/calc/").then(res => res.data);
}