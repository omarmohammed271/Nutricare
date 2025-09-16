import { axiosInstance } from "../axiosInstance";
import httpClient from "@src/helpers/httpClient";
interface ILogin{
    email : string ,
    password : string
}
interface IResetPassword{
    email : string,
    new_password : string
}
export const handleLogin = async (data:ILogin) => {
    return axiosInstance.post('/api/users/login/', data)
}
export const handleResetPassword = async (data : IResetPassword) =>{
    return httpClient.post('/users/password-reset-done/',data)
}