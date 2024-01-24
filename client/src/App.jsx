import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductByBrandPage from "./pages/ProductByBrandPage.jsx";
import ProductByCategoryPage from "./pages/ProductByCategoryPage.jsx";
import ByKeywordPage from "./pages/ByKeywordPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path= "/" element={<HomePage/>} />
                    <Route path="/by-brand/:id" element={<ProductByBrandPage/>} />
                    <Route path="/by-category/:id" element={<ProductByCategoryPage/>} />
                    <Route path='/by-keyword/:keyword' element={<ByKeywordPage/>} />
                    <Route path="/details/:id" element={<ProductDetailsPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;