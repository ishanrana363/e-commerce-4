import React from 'react';
import AppNavbar from "./AppNavbar.jsx";
import Footer from "./Footer.jsx";

const Layout = (props) => {
    return (
        <div>
            <AppNavbar/>
            {
                props.children
            }
            <Footer/>
        </div>
    );
};

export default Layout;