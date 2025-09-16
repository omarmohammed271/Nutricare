import { axiosInstance } from "./axiosInstance";

type EquationsData = {
    available_equations: {
        id: number;
        name: string;
        code: string;
        function_path: string;
        description: string;
    }[]
}

export const getEquations = async () => {
    return axiosInstance.get<EquationsData>("api/nutritions/equations/").then(res => res.data);
}

export const addEquations = async (data: any) => {
    return axiosInstance.post("api/nutritions/equations/", data);
}

export const getCaclulations = async () => {
    return axiosInstance.get("api/nutritions/calculations/").then(res => res.data);
}

export const addCaclulations = async (data: any) => {
    return axiosInstance.post("api/nutritions/calculations/", data);
}