import React from 'react';
import productStore from "../../store/ProductStore.js";
import CategoriesSkeleton from "../../skeleton/CategoriesSkeleton.jsx";
import {Link} from "react-router-dom";

const Categories = () => {
    const {productCategoryList} = productStore();
    if (productCategoryList===null){
        return <CategoriesSkeleton/>
    }else {
        return (
            <div>
                <div className="section" >
                    <div className="container" >
                        <div className="row" >
                            <h1 className="headline-4 text-center py-2 p-0 " >Top Categories</h1>
                            <span className="bodySmall mb-5 text-center " >Explore a World of Choices Across Our Most Popular <br
                            />Shopping Categories</span>
                            {
                                productCategoryList.map((item,i)=>{
                                    return(
                                        <div key={i} className="col-md-8r col-lg-8r text-center py-2 col-6 " >
                                            <Link to={`/by-category/${item["_id"]}`} className="card h-100 bg-white rounded-3 " >
                                                <div className="card-body" >
                                                    <img className="w-75" alt="img" src={item["categoryImg"]} />
                                                    <p className="mt-3  " > { item["categoryName"] } </p>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Categories;