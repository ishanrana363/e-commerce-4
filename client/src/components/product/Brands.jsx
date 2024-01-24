import React from 'react';
import productStore from "../../store/ProductStore.js";
import BrandSkeleton from "../../skeleton/BrandSkeleton.jsx";
import {Link} from "react-router-dom";

const Brands = () => {
    const {productBrandList} = productStore();
    if (productBrandList===null){
        return <BrandSkeleton/>
    }else {
        return (
            <div className="section" >
                <div className="container" >
                    <div className="row" >
                        <h1 className="text-center headline-4  my-2 p-0 " >Top Brands</h1>
                        <span className="text-center mb-5 bodySmall " >Explore a World of Choices Across Our Most Popular <br
                        />Shopping Categories</span>
                        {
                            productBrandList.map((item,i)=>{
                                return(
                                    <div key={i} className="col-md-8r col-lg-8r p-2 col-6 col-sm-8r " >
                                        <Link to={`/by-brand/${item["_id"]}`} className="card h-100 bg-white rounded-3 " >
                                           <div className="card-body" >
                                               <img className="w-75" src={item["brandImg"]} alt="img" />
                                               <p> {item["brandName"]} </p>
                                           </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default Brands;