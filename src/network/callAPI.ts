import AxiosInstance from "./axiosInstance";
import { localStorage } from "@/utils";
const axios = AxiosInstance();

export interface ILogin {
    idToken: string | null;
    fcm_token: string;
}



export const loginWithGoogle = async (data: ILogin) => {
    try {
        const response = await axios.post("auth/login-google", data);
        localStorage.set('token', response.data.accessToken);
        console.log("fcm phiiiiiiiiiiiiiiiii",response.data.accessToken, "fcm phiiiiiiiiiiiiiiiii");
        return response;
    } catch (error) {
        return error;
    }
}


//auth/login
export const login = async (email : string, password : string,fcm:string) => {
    try {
        const response = await axios.post("auth/login", {email, password,fcm});
        return response;
    } catch (error) {
        return error;
    }
}

//auth/register

export const registerUser = async ( email: string, password: string, gender: any, account_type: number) => {
    try {
        const response = await axios.post("auth/register", {email, password,gender, account_type});
        return response;
    } catch (error) {
        return error;
    }
}

//auth/change_pass
export const changePassword = async (oldPass: string, newPass: string) => {
    try {
        const response = await axios.patch("auth/change_pass", {oldPass, newPass});
        return response.data;
    } catch (error) {
        throw error; 
    }
}
