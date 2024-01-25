import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductByBrandPage from "./pages/ProductByBrandPage.jsx";
import ProductByCategoryPage from "./pages/ProductByCategoryPage.jsx";
import ByKeywordPage from "./pages/ByKeywordPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import RefaundPage from "./pages/RefaundPage.jsx";
import Terms from "./pages/Terms.jsx";
import HowBuyPage from "./pages/HowBuyPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ComplainPage from "./pages/ComplainPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LoginVerify from "./components/user/LoginVerify.jsx";
import OtpPage from "./pages/OtpPage.jsx";

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
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
                    <Route path="/refund" element={<RefaundPage/>} />
                    <Route path="/terms" element={<Terms/>} />
                    <Route path="/how-to-buy" element={<HowBuyPage/>} />
                    <Route path="/contact" element={<ContactPage/>} />
                    <Route path="/complain" element={<ComplainPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/otp" element={<OtpPage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;