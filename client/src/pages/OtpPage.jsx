import React from 'react';
import Layout from "../components/layout/Layout.jsx";
import OtpVerify from "../components/user/OtpVerify.jsx";

const OtpPage = () => {
    return (
        <div>
            <Layout>
                <OtpVerify/>
            </Layout>
        </div>
    );
};

export default OtpPage;