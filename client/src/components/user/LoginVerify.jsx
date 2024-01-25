import UserSubmitButton from "./UserSubmitButton.jsx";
import userStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/validationHelper.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const LoginVerify = () => {
    const {loginFromValue,userOtpRequest,loginFromOnChange} = userStore()
    const navigate =  useNavigate()
    const onSubmitButton = async () => {
        if (!ValidationHelper.IsEmail(loginFromValue.email)){
            toast.error("Valid Email Address Is Required")
        }else {
            let res = await userOtpRequest(loginFromValue.email);
            if (res){
                navigate("/otp")
            }else {
                toast.error("Something went worng ")
            }
        }

    }
    return (
        <div>
            <div className="container section">
                <div  className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <div className="card p-5">
                            <h4>Enter Your Email</h4>
                            <p>A verification code will be sent to the email address you provide</p>
                            <input value={loginFromValue.email} onChange={(e)=>{loginFromOnChange("email",e.target.value)}}
                                   placeholder="Email Address" type="email" className="form-control"/>
                            <UserSubmitButton onClick={onSubmitButton} className="btn mt-3 btn-success" text="Next"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginVerify;