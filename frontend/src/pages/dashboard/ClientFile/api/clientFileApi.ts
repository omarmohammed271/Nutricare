import httpClient from "@src/helpers/httpClient";
import { ClientFileData } from "../types/clientFileTypes";

// Submit client file data to the API (POST for new client)
export const submitClientFile = async (data: ClientFileData | FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    };
    
    const response = await httpClient.post("/clients/", data, config);
    return response.data;
  } catch (error) {
    console.error("Error submitting client file:", error);
    throw error;
  }
};

// Update existing client file data (PUT for existing client)
export const updateClientFile = async (clientId: string, data: ClientFileData | FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    };
    
    const response = await httpClient.put(`/clients/${clientId}/`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error updating client file:", error);
    throw error;
  }
};

// Update existing client file data using PUT (for full updates)
export const updateClientFileData = async (clientId: string, data: ClientFileData | FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    };
    
    const response = await httpClient.put(`/clients/${clientId}/`, data, config);
    return response.data;
  } catch (error) {
    console.error("Error updating client file:", error);
    throw error;
  }
};

// Get client file data (if needed for editing)
export const getClientFile = async (clientId: string) => {
  try {
    const response = await httpClient.get(`/clients/${clientId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client file:", error);
    throw error;
  }
};


