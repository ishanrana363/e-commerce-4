import {create} from "zustand";
import axios from "axios";
import {getEmail, setEmail} from "../utility/utility.js";
import cookies from "js-cookie"
const userStore = create((set)=>({

    isFromSubmit :false,
    loginFromValue : {email:""},
    loginFromOnChange : (name,value)=>{
        set((status)=>({
            loginFromValue : {
                ...status.loginFromValue,
                [name]: value
            }
        }))
    },

    otpData : {otp:""},
    loginOtpOnChangeValue : (name,value)=>{
        set((status)=>({
            otpData : {
                ...status.otpData.otp,
                [name]:value
            }
        }))
    },

    userOtpRequest : async (email) =>{
        set({isFromSubmit : true})
        let res = await axios.get(`/api/v1/otp-create/${email}`)
        setEmail(email);
        set({isFromSubmit : false})
        return res.data["status"]==="success";
    },

    userVerifyOtpRequest : async (otp) =>{
        set({isFromSubmit : true})
        let email = getEmail();
        let res = await axios.get(`/api/v1/login/${email}/${otp}`);
        set({isFromSubmit : false})
        return res.data["status"]==="success";
    },
    isLogin : ()=>{
        return !!cookies.get("token")
    } ,

    userLogoutRequest : async () =>{
        set({isFromSubmit : true})
        let res = await axios.get(`/api/v1/logout`);
        set({isFromSubmit : false})
        return res.data["status"]==="success";
    }

}))


export default userStore;