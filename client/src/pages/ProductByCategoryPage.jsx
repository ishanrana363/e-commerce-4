import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import productStore from "../store/ProductStore.js";
import ProductList from "../components/product/ProductList.jsx";
import Layout from "../components/layout/Layout.jsx";

const ProductByCategoryPage = () => {
    const {ListByCategoryRequest} =  productStore();
    const {id} = useParams();
    useEffect(() => {
        (async ()=>{
            await ListByCategoryRequest(id)
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

export default ProductByCategoryPage;