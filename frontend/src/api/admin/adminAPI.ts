import { axiosInstance } from "../axiosInstance";
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
    return axiosInstance.post('/api/users/password-reset-done/',data)
}