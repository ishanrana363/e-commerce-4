import React from 'react';
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import imgPlace from "../assets/images/image.json"
const DetailsSkeleton = () => {
    return (
        <div>
            <div className="container mt-2 " >
                <div className="row" >
                    <div className="col-md-7 align-content-center p-2 ">
                        <div className="container" >
                            <div className="row" >
                                <div className="col-12" >
                                    <Skeleton count={20} />
                                </div>
                                <div className= "col-3" >
                                    <Lottie animationData={imgPlace} loop={true} />
                                </div>
                                <div className= "col-3" >

                                </div>
                                <div className= "col-3" >

                                </div>
                                <div className= "col-3" >

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5" ></div>
                </div>
            </div>
        </div>
    );
};

export default DetailsSkeleton;