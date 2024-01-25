import React from 'react';
import Lottie from "lottie-react";
import LottieLego from "../assets/images/LottieLego.json";
import Skeleton from "react-loading-skeleton";

const LegalSkeleton = () => {
    return (
        <div>
            <div className="container mt-3 " >
                <div className="row" >
                    <div className="col-md-12 " >
                        <div className="card p-5 " >
                            {
                                Array.from({length:10}).map(()=>{
                                    return(
                                        <div  >
                                            <Skeleton count={3} />
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalSkeleton;