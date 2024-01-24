import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import imgPlaceHolder from "../assets/images/image.json"
const DetailsSkeleton = () => {
    return (
        <div className="container" >
            <div className= "row" >
                <div className="col-md-7  align-content-center mt-5 " >
                    <div className="container" >
                        <div className="row" >
                            <div className="col-12" >
                                <Skeleton count={15} />
                            </div>
                            <div className="col-3" >
                                <Lottie animationData={imgPlaceHolder}/>
                            </div>
                            <div className="col-3" >
                                <Lottie animationData={imgPlaceHolder}/>
                            </div>
                            <div className="col-3" >
                                <Lottie animationData={imgPlaceHolder}/>
                            </div>
                            <div className="col-3" >
                                <Lottie animationData={imgPlaceHolder}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 p-2 mt-4 " >
                    <Skeleton count={20} />
                </div>
            </div>
        </div>
    );
};

export default DetailsSkeleton;