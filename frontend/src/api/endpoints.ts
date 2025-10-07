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

// Client Choices API
// The API returns objects with {key: label} structure, not arrays of {value, label}
interface ClientChoices {
  ward_type: Record<string, string>;
  physical_activity: Record<string, string>;
  stress_factor: Record<string, string>;
  feeding_type: Record<string, string>;
  gender: Record<string, string>;
}

export const getClientChoices = async (): Promise<ClientChoices> => {
    console.log('🌐 Making API call to /clients/choices/');
    return httpClient.get<ClientChoices>("/clients/choices/").then(res => {
        console.log('📊 API response received:', res.data);
        return res.data;
    });
}

// Client API
interface LabResult {
  id: number;
  test_name: string;
  result: string;
  reference_range: string;
  interpretation: string;
  file: string | null;
  date: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  notes: string;
}

interface Client {
  id: number;
  name: string;
  gender: string;
  age: number;
  date_of_birth: string;
  weight: number;
  height: number;
  physical_activity: string;
  ward_type: string;
  stress_factor: string;
  feeding_type: string;
  lab_results: LabResult[];
  medications: Medication[];
}

export const getClients = async (): Promise<Client[]> => {
    console.log('🌐 Making API call to /clients/');
    return httpClient.get<Client[]>("/clients/").then(res => {
        console.log('📊 Clients API response received:', res.data);
        return res.data;
    });
}

export const createFollowUp = async (clientId: number, data: any) => {
    console.log(`🌐 Making API call to /clients/${clientId}/follow-up/`);
    return httpClient.post(`/clients/${clientId}/follow-up/`, data).then(res => {
        console.log('📊 Follow-up API response received:', res.data);
        return res.data;
    });
}

export const createAppointment = async (data: any) => {
    console.log('🌐 Making API call to /appointments/');
    return httpClient.post('/appointments/', data).then(res => {
        console.log('📊 Appointment API response received:', res.data);
        return res.data;
    });
}

// Follow-up extended types and APIs
export interface FollowUp {
  id: number;
  notes?: string;
  weight?: number;
  height?: number;
  blood_pressure?: string;
  temperature?: number;
  status?: 'scheduled' | 'completed' | 'cancelled' | string;
  date?: string;
  // nested copies for snapshotting at follow-up
  name?: string;
  gender?: string;
  date_of_birth?: string;
  physical_activity?: string;
  ward_type?: string;
  stress_factor?: string;
  feeding_type?: string;
  lab_results?: LabResult[];
  medications?: Medication[];
}

export interface ClientWithFollowUps extends Client {
  follow_ups?: FollowUp[];
  is_finished?: boolean;
}

export const getClientById = async (clientId: number): Promise<ClientWithFollowUps> => {
  console.log(`🌐 Making API call to /clients/${clientId}/`);
  return httpClient.get<ClientWithFollowUps>(`/clients/${clientId}/`).then(res => res.data);
}

export const updateFollowUp = async (
  clientId: number,
  followUpId: number,
  data: any
) => {
  console.log(`🌐 Updating follow-up ${followUpId} for client ${clientId}`);
  return httpClient.put(`/clients/${clientId}/follow-up/${followUpId}/`, data).then(res => res.data);
}

export const deleteFollowUp = async (clientId: number, followUpId: number) => {
  console.log(`🌐 Deleting follow-up ${followUpId} for client ${clientId}`);
  return httpClient.delete(`/clients/${clientId}/follow-up/${followUpId}/`).then(res => res.data);
}