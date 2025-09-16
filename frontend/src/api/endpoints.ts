import httpClient from "@src/helpers/httpClient";


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
    return httpClient.get<EquationsData>("/nutritions/equations/").then(res => res.data);
}

export const addEquations = async (data: any) => {
    return httpClient.post("/nutritions/equations/", data);
}

export const getCaclulations = async () => {
    return httpClient.get("/nutritions/calculations/").then(res => res.data);
}

export const addCaclulations = async (data: any) => {
    return httpClient.post("/nutritions/calculations/", data);
}