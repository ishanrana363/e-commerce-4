import React from 'react';
import featureStore from "../../store/FeatureStore.js";
import FeatureSkeleton from "../../skeleton/FeatureSkeleton.jsx";
import Lottie from "lottie-react";
import imgPlaceHolder from "../../assets/images/image.json";
import Skeleton from "react-loading-skeleton";

const Feature = () => {
    const {featureList} = featureStore()
    if (featureList===null){
        return <FeatureSkeleton/>
    }else {
        return (
            <div className="container section " >
                <div className="row  " >
                    {
                        featureList.map((item,i)=>{
                            return(
                                <div key={i} className="col-md-3 col-lg-3 col-sm-12 col-12 bg-white p-2 " >
                                    <div className="card shadow-sm" >
                                        <div className="card-body" >
                                            <div className="row" >
                                                <div className="col-3" >
                                                    <img className="w-100" src={item["img"]} alt="img" />
                                                </div>
                                                <div className="col-9" >
                                                    <h3 className= "bodyXLarge" > { item["name"] } </h3>
                                                    <span className="bodySmall" >{ item["description"] }</span>
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
    }
};

export default Feature;
// Array.from({length:4}).map((i)=>{
//     return(
//         <div key={i} className="col-md-3 col-lg-3 col-sm-6 col-6 p-2 bg-white " >
//             <div className="card shadow-sm " >
//                 <div className="card-body" >
//                     <div className="row" >
//                         <div className="col-4" >
//                             <Lottie className="w-100" animationData={imgPlaceHolder} loop={true} />
//                         </div>
//                         <div className="col-8" >
//                             <Skeleton count={3} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// })