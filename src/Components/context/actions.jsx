/* eslint-disable import/no-anonymous-default-export */
import { reguser, checkemail } from "../services/regAPI";
import axios from "axios";
import { header, baseURL, API_URL } from "../services/api"



export async function checkEmail(email) {
    try {
        let data = checkemail(email);
        return data
    } catch (error) {
        return error
    }
}
export async function RegisterUser(Reg) {
    try {
        let data = {
            email: Reg.email,
            role: Reg.role,
            password: Reg.password,
            cnfpass: Reg.cnfpass
        }
        let result = await reguser(data)
        return result;
    } catch (error) {
        if (error.response.data.message) {
            alert(`${error.response.data.message}`)
        } else {
            alert(`${error.response.data}. User do not exist`)
        }
    }
}
export async function loginUser(loginPayload) {

    try {
        const res = await axios.post(`${baseURL}/login`, loginPayload, header)

        if (res.data) {
            sessionStorage.setItem('currentUser', JSON.stringify(res.data));
            return res
        }
        return;
    } catch (error) {
        return error
        // if(error.response.data.message){
        //     alert(`${error.response.data.message}`)
        // }else {
        //     alert(`${error.response.data}`)
        // }

    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('UserProfile');
    sessionStorage.removeItem('workfile');
    sessionStorage.removeItem('chat');
}


export default { loginUser, logout }