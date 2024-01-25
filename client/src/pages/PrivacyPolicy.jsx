import React, {useEffect} from 'react';
import featureStore from "../store/FeatureStore.js";
import Layout from "../components/layout/Layout.jsx";
import Legal from "../components/feature/Legal.jsx";

const PrivacyPolicy = () => {
    const {legalDataRequest} = featureStore()
    useEffect(() => {
        (async ()=>{
            await legalDataRequest("privacy")
        }) ()
    }, []);
    return (
        <div>
            <Layout>
                <Legal/>
            </Layout>
        </div>
    );
};

export default PrivacyPolicy;