import React from 'react';
import Lottie from "lottie-react";
import LottieLego from "../assets/images/LottieLego.json"
const BrandSkeleton = () => {
    return (
        <div className="section" >
            <div className="container" >
                <div className="row" >
                    <h1 className="text-center headline-4  my-2 p-0 " >Top Brands</h1>
                    <span className="text-center mb-5 bodySmall " >Explore a World of Choices Across Our Most Popular <br
                    />Shopping Categories</span>
                    {
                        Array.from({length:16}).map((key, i)=>{
                            return(
                                <div key={i} className= "col-md-8r col-lg-8r col-6  col-sm-8r text-center p-2 " >
                                    <div className="card h-100 rounded-3 shadow-sm bg-white " >
                                        <Lottie className="w-100" animationData={LottieLego}/>
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

export default BrandSkeleton;