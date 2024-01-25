import featureStore from "../store/FeatureStore.js";
import {useEffect} from "react";
import Layout from "../components/layout/Layout.jsx";
import Legal from "../components/feature/Legal.jsx";

const AboutPage = () => {
    const {legalDataRequest} = featureStore()
    useEffect(() => {
        (async ()=>{
            await legalDataRequest("about")
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

export default AboutPage;