import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import productStore from "../../store/ProductStore.js";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton.jsx";

const ProductList = () => {
    const {ListProduct,productCategoryList,
        productCategoryListRequest,productBrandList,productBrandListRequest,filterDataRequest} = productStore();
    const [filter, setFilter] = useState({
        categoryID : " ",
        brandID : " ",
        minPrice : " ",
        maxPrice : ""
    })
    const onInputChange = (name,value) => {
        setFilter((data)=>({
            ...data ,
            [name] : value
        }))
    }
    useEffect(() => {
        (async ()=>{
            productCategoryList===null ? await productCategoryListRequest() : null;
            productBrandList===null ? await productBrandListRequest() : null
            let isEmptyProperty = Object.values(filter).every(value => value=== "")
            !isEmptyProperty ? await filterDataRequest(filter) : null

        })()
    }, [filter]);
    return (
        <div>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-3 p-2">
                        <div className="card vh-100 p-3">
                            <label className="form-label mt-3">Brands</label>
                            <select value={filter.brandID} onChange={(e)=>{onInputChange("brandID",e.target.value)}} className="form-control form-select">
                                <option value= "" > Choose Brand  </option>
                                {
                                    productBrandList!==null ? (
                                        productBrandList.map((item,i)=>{
                                            return(
                                                <option value= { item["_id"] } >{ item["brandName"] }  </option>
                                            )
                                        })
                                    ) : ( <span></span> )
                                }

                            </select>
                            <label className="form-label mt-3">Categories</label>
                            <select value={filter.categoryID} onChange={(e)=>{onInputChange("categoryID",e.target.value)}} className="form-control form-select">
                                <option value="">Choose Category</option>
                                {
                                    productCategoryList!==null ?
                                        (
                                            productCategoryList.map((item,i)=>{
                                                return(
                                                    <option key={i} value= {item["_id"]} >{ item["categoryName"] }</option>
                                                )
                                            })
                                        )
                                        :
                                        (<span></span>)
                                }
                            </select>
                            <label className="form-label mt-3">Maximum Price ${filter.maxPrice}</label>
                            <input value={filter.maxPrice} onChange={(e)=>{onInputChange("maxPrice",e.target.value)}} min={0} max={1000000} step={1000} type="range" className="form-range" />
                            <label className="form-label mt-3">Minimum Price ${filter.minPrice}</label>
                            <input value={filter.minPrice} onChange={(e)=>{onInputChange("minPrice",e.target.value)}} min={0} max={1000000} step={1000} type="range" className="form-range" />
                        </div>
                    </div>
                    <div className="col-md-9 p-2">
                        {
                            ListProduct===null ? ( <ProductsSkeleton/> ) : (
                                <div className="container">
                                    <div className="row">
                                        {
                                            ListProduct.map((item,i)=>{
                                                let price=<p className="bodyMedium  text-dark my-1">Price: ${item['price']} </p>
                                                if(item['discount']===true){
                                                    price=<p className="bodyMedium  text-dark my-1">Price:<strike> ${item['price']} < /strike> ${item['discountPrice']} </p>
                                                }
                                                return(
                                                    <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                        <Link to={`/details/${item['_id']}`} className="card shadow-sm h-100 rounded-3 bg-white">
                                                            <img className="w-100 rounded-top-2" src={item['image']} />
                                                            <div className="card-body">
                                                                <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                                                {price}
                                                                <StarRatings rating={parseFloat(item['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;