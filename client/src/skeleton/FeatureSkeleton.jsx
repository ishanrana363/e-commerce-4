import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import imgPlaceHolder from "../assets/images/image.json"
const FeatureSkeleton = () => {
    return (
        <div className="container section " >
            <div className="row  " >
                {
                    Array.from({length:4}).map((i)=>{
                        return(
                            <div key={i} className="col-md-3 col-lg-3 col-sm-6 col-6 p-2 bg-white " >
                                <div className="card shadow-sm " >
                                    <div className="card-body" >
                                        <div className="row" >
                                            <div className="col-4" >
                                                <Lottie className="w-100" animationData={imgPlaceHolder} loop={true} />
                                            </div>
                                            <div className="col-8" >
                                                <Skeleton count={3} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default FeatureSkeleton;