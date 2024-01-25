import React from 'react';
import UserSubmitButton from "./UserSubmitButton.jsx";
import userStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/validationHelper.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const OtpVerify = () => {
    const {userVerifyOtpRequest,otpData,loginOtpOnChangeValue} = userStore()
    const navigate = useNavigate()
     const otpOnSubmit =async () => {
        if (ValidationHelper.IsEmpty(otpData.otp)){
            toast.error("Otp pin required")
        }else {
            let res = await userVerifyOtpRequest(otpData.otp);
            if (res){
                navigate("/")
            }else {
                toast.error("Something went worng ")
            }
        }
     }
    return (
        <div>
            <div className="container section">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <div  className="card p-5">
                            <h4>Enter Verification Code</h4>
                            <p>A verification code has been sent to the email address you provide</p>
                            <input value={otpData.otp} placeholder="Verification"
                                onChange={(e)=>{loginOtpOnChangeValue("otp",e.target.value)}}   type="text" className="form-control"/>
                            <UserSubmitButton onClick={otpOnSubmit} className="btn mt-3 btn-success" text="Submit"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;