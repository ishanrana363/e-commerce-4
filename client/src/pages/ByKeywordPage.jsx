import React, {useEffect} from 'react';
import productStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import ProductList from "../components/product/ProductList.jsx";

const ByKeywordPage = () => {
    const {keyword} = useParams()
    const {ListByKeywordRequest} = productStore()
    useEffect(() => {
        (async ()=>{
            await ListByKeywordRequest(keyword)
        })()
    }, [keyword]);
    return (
        <div>
            <Layout>
                <ProductList/>
            </Layout>
        </div>
    );
};

export default ByKeywordPage;