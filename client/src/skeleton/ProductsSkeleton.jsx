import React from 'react';
import Lottie from "lottie-react";
import LottieLego from "../assets/images/LottieLego.json"

const ProductsSkeleton = () => {
    return (
        <div>
            <div className="container  " >
                <div className="row" >
                    {
                        Array.from({length:8}).map(()=>{
                            return(
                                <div className="col-md-3 col-lg-3 col-12 col-sm-12 p-2" >
                                    <div className="card shadow-sm h-100 bg-warning rounded-5 bg-white   " >
                                        <div className="card-body  " >
                                            <Lottie animationData={LottieLego}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductsSkeleton;