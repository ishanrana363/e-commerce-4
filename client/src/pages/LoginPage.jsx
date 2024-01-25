import React from 'react';
import Layout from "../components/layout/Layout.jsx";
import LoginVerify from "../components/user/LoginVerify.jsx";

const LoginPage = () => {
    return (
        <div>
            <Layout>
                <LoginVerify/>
            </Layout>
        </div>
    );
};

export default LoginPage;