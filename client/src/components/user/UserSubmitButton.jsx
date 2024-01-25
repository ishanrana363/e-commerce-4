import React from 'react';
import userStore from "../../store/UserStore.js";

const UserSubmitButton = (props) => {
    const {isFromSubmit} = userStore()
    if (isFromSubmit===false){
        return <button onClick={props.onClick} type="submit" className={props.className}>  {props.text}  </button>
    }else {
        return (
            <div>
                <button disabled={true} className={props.className} >
                    <div className="spinner-border spinner-border-sm " role="status" ></div>
                    processing...
                </button>
            </div>
        );
    }

};

export default UserSubmitButton;