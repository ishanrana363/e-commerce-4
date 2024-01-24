import React from 'react';
// import imageGallery from "react-image-gallery/src/components/ImageGallery.jsx";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import imgPlaceHolder from "../assets/images/image.json"
const SliderSkeleton = () => {
    return (
        <div className= "container-fluid hero-bg ">
            <div className="row justify-content-center " >
                <div className= "col-md-6 col-lg-6 col-sm-12 col-12 p-5 " >
                    <Skeleton count = {7} />
                    <br/>
                    <Skeleton count = {7} />
                </div>
                <div className= "col-md-6 col-lg-6 col-sm-12 col-12  " >
                    <Lottie className="w-75" animationData={imgPlaceHolder} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default SliderSkeleton;