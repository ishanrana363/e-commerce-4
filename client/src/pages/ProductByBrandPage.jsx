import React, {useEffect} from 'react';
import Layout from "../components/layout/Layout.jsx";
import {useParams} from "react-router-dom";
import productStore from "../store/ProductStore.js";
import ProductList from "../components/product/ProductList.jsx";

const ProductByBrandPage = () => {
    const {id} = useParams();
    const {ListByBrandRequest} = productStore();
    useEffect(() => {
        (async ()=>{
            await ListByBrandRequest(id)
        })()
    }, [id]);
    return (
        <div>
            <Layout>
                <ProductList/>
            </Layout>
        </div>
    );
};

export default ProductByBrandPage;