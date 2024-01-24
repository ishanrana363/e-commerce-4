import React, {useState} from 'react';
import productStore from "../../store/ProductStore.js";
import DetailsSkeleton from "../../skeleton/DetailsSkeleton.jsx";
import parse from "html-react-parser"
import ImageGallery from "react-image-gallery";
import ProductImg from "./ProductImg.jsx";
import ProductReview from "./ProductReview.jsx";
const ProductDetails = () => {
    const {productDetails} = productStore()
    const [data, setData] = useState(0);
    const incrementData = () => {
        setData(data+1)
    }
    const decrementData = () => {
        if (data>0){
            setData(data-1)
        }
    }
    if (productDetails===null){
        return <DetailsSkeleton/>
    }else {
        return (
            <div>
                <div className="container mt-2 " >
                    <div className="row" >
                        <div className="col-md-7 p-3 " >
                            <ProductImg/>
                        </div>
                        <div className="col-md-5 p-3 " >
                            <h4> { productDetails[0]["title"] } </h4>
                            <p className="text-muted bodySmall my-1 " > { productDetails[0]["category"]["categoryName"] }  </p>
                            <p className="text-muted bodySmall my-1 " > { productDetails[0]["brand"]["brandName"] } </p>
                            <p className="text-muted bodySmall mb-2 mt-1 " > { productDetails[0]["shortDes"]} </p>
                            <span>
                                {
                                    productDetails[0]["discount"] ? (
                                        <span className="bodyXLarge" >Price
                                            <strike className="text-secondary" >  : { productDetails[0]["price"] } </strike>
                                            <span className="mx-3" >{ productDetails[0]["discountPrice"] }$</span>
                                        </span>
                                    ) : (
                                        <span className="bodyXLarge" >
                                            Price : { productDetails[0]["price"] }
                                        </span>
                                    )
                                }
                        </span>
                            <div className="row" >
                                <div className="col-4 p-2 " >
                                    <label className="bodySmall" >Size</label>
                                    <select className="form-control my-2 form-select " >
                                        <option value= "" >  Color  </option>

                                        {
                                            productDetails[0]["product"]["color"].split(",").map((item,i)=>{
                                                return(
                                                    <option key={i} value={item} > {item} </option>

                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div className="col-4 p-2 " >
                                    <label className="bodySmall" >Size</label>
                                    <select className="form-control my-2 form-select " >
                                        <option value= "" >  Size  </option>

                                        {
                                            productDetails[0]["product"]["size"].split(",").map((item,i)=>{
                                                return(
                                                    <option key={i} value={item} > {item} </option>

                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-4 p-2 " >
                                    <label className="text-black">Quantity</label>
                                    <div className="input-group mt-2 ">
                                        <button onClick={()=>{decrementData()}} className="btn btn-outline-secondary " >-</button>
                                        <input value={data} type="text" readOnly className="form-control bg-light text-center " />
                                        <button onClick={()=>{incrementData()}} className="btn btn-outline-secondary " >+</button>
                                    </div>
                                </div>

                                <div className="col-4 p-2 " >
                                    <button className="btn w-100 btn-danger " >Add to Cart</button>
                                </div>

                                <div className="col-4 p-2 " >
                                    <button className="btn w-100 btn-danger " >Add to Wish </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab"
                                        aria-controls="nav-home" aria-selected="true">Specifications</button>
                                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab"
                                        aria-controls="nav-profile" aria-selected="false">Review</button>

                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                                {
                                    parse(productDetails[0]["product"]["des"])
                                }
                            </div>
                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                                <ProductReview/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductDetails;