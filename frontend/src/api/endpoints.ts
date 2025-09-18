import httpClient from "@src/helpers/httpClient";

interface Equation {
    id: number;
    name: string;
    code: string;
    function_path: string;
    description: string;
  }

type EquationsData = {
    available_equations: Equation[]
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

  interface Assessment {
    id: number;
    name: string;
    description: string;
    equations: Equation[];
  }

export const getEquationsCategories = async () => {
    return httpClient.get<Assessment[]>("/nutritions/category-equations/").then(res => res.data);
}

export const addEquationsCategories = async (data: any) => {
    return httpClient.post("/nutritions/category-equations/", data);
}