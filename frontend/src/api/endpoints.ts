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

// Appointments API
interface Appointment {
  patient_name_id: number;
  start_time: string;
  end_time: string;
  appointment_type: string;
  status: string;
  notes: string;
}

export const createAppointment = async (data: Appointment) => {
    console.log('🌐 Making API call to create appointment:', data);
    return httpClient.post("/clients/appointment/", data).then(res => {
        console.log('📊 Appointment created successfully:', res.data);
        return res.data;
    });
}

export const getAppointments = async (): Promise<Appointment[]> => {
    console.log('🌐 Making API call to /appointments/');
    return httpClient.get<Appointment[]>("/clients/appointment/").then(res => {
        console.log('📊 Appointments API response received:', res.data);
        return res.data;
    });
}

// Add delete appointment function
export const deleteAppointment = async (id: number) => {
    console.log('🌐 Making API call to delete appointment:', id);
    return httpClient.delete(`/clients/appointment/${id}/`).then(res => {
        console.log('📊 Appointment deleted successfully:', id);
        return res.data;
    });
}

// Add patch appointment function
export const patchAppointment = async (id: number, data: Partial<Appointment>) => {
    console.log('🌐 Making API call to patch appointment:', id, data);
    return httpClient.patch(`/clients/appointment/${id}/`, data).then(res => {
        console.log('📊 Appointment patched successfully:', id);
        return res.data;
    });
}
