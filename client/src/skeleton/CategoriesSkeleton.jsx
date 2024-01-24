import React from 'react';
import Lottie from "lottie-react";
import LottieLego from "../assets/images/LottieLego.json"
const CategoriesSkeleton = () => {
    return (
        <div className="section" >
            <div className="container" >
                <div className="row" >
                    <h1 className="headline-4 text-center my-2 p-0 " >Top Categories</h1>
                    <span className="bodySmall mb-5 text-center " >Explore a World of Choices Across Our Most Popular <br
                    />Shopping Categories</span>

                    {
                        Array.from({length:16}).map(()=>{
                            return(
                                <div className="col-6 col-lg-8r col-md-8r text-center p-2  " >
                                    <div className="card h-100 bg-white rounded-3 " >
                                        <div className="card-body" >
                                            <Lottie className="w-100" animationData={LottieLego}/>
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

export default CategoriesSkeleton;