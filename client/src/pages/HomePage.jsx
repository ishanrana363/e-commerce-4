import React, {useEffect} from 'react';
import Layout from "../components/layout/Layout.jsx";
import Slider from "../components/product/Slider.jsx";
import Feature from "../components/product/Feature.jsx";
import Categories from "../components/product/Categories.jsx";
import RemarkProducts from "../components/product/RemarkProducts.jsx";
import Brands from "../components/product/Brands.jsx";
import ProductStore from "../store/ProductStore.js";
import FeatureStore from "../store/FeatureStore.js";

const HomePage = () => {
    const {productSliderListRequest,productCategoryListRequest,productBrandListRequest,listByRemarkRequest} = ProductStore();
    const {featureListRequest} = FeatureStore()
    useEffect(() => {
        (async ()=>{
            await productSliderListRequest();
            await featureListRequest();
            await productCategoryListRequest();
            await listByRemarkRequest("new");
            await productBrandListRequest()
        })()
    }, []);
    return (
        <div>
            <Layout>
                <Slider/>
                <Feature/>
                <Categories/>
                <RemarkProducts/>
                <Brands/>
            </Layout>
        </div>
    );
};

export default HomePage;