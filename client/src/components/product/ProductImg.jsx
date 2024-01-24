import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import productStore from "../../store/ProductStore.js";
const ProductImg = () => {
    const {productDetails} = productStore()
    const images = [
        {
            original: productDetails[0]["product"]["img1"] ,
            thumbnail: productDetails[0]["product"]["img1"],
        },
        {
            original: productDetails[0]["product"]["img2"] ,
            thumbnail: productDetails[0]["product"]["img2"],
        },
        {
            original: productDetails[0]["product"]["img3"] ,
            thumbnail: productDetails[0]["product"]["img3"],
        },
        {
            original: productDetails[0]["product"]["img4"] ,
            thumbnail: productDetails[0]["product"]["img4"],
        },
        {
            original: productDetails[0]["product"]["img5"] ,
            thumbnail: productDetails[0]["product"]["img5"],
        },{
            original: productDetails[0]["product"]["img6"] ,
            thumbnail: productDetails[0]["product"]["img6"],
        },{
            original: productDetails[0]["product"]["img7"] ,
            thumbnail: productDetails[0]["product"]["img7"],
        },{
            original: productDetails[0]["product"]["img8"] ,
            thumbnail: productDetails[0]["product"]["img8"],
        },



    ];
    return (
        <div>
            <ImageGallery autoPlay = {false} items = {images} />
        </div>
    );
};

export default ProductImg