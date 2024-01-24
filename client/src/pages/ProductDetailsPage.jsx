import React, {useEffect} from 'react';
import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import ProductDetails from "../components/product/ProductDetails.jsx";
import Brands from "../components/product/Brands.jsx";

const ProductDetailsPage = () => {
    const {id} = useParams()
    const {productReviewRequest,productDetailsRequest,productBrandListRequest} = productStore()
    useEffect(() => {
        (async ()=>{
            await productDetailsRequest(id);
            await productReviewRequest(id);
            await productBrandListRequest();
        })()
    }, [id]);
    return (
        <div>
            <Layout>
                <ProductDetails/>
                <Brands/>
            </Layout>
        </div>
    );
};

export default ProductDetailsPage;