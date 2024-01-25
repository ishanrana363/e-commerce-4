import React from 'react';
import AppNavbar from "./AppNavbar.jsx";
import Footer from "./Footer.jsx";
import {Toaster} from "react-hot-toast";

const Layout = (props) => {
    return (
        <div>
            <AppNavbar/>
            {
                props.children
            }
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <Footer/>
        </div>
    );
};

export default Layout;