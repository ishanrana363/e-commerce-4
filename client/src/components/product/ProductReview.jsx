import React from 'react';
import productStore from "../../store/ProductStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const ProductReview = () => {
    const {productReview } = productStore()
    return (
        <div>
            <ul  className="list-group list-group-flush  ">

                {
                    productReview!==null ? (
                            productReview.map((item,i)=>{
                                return(
                                    <li key={i} className="list-group-item m-0">
                                        <p className="mt-2 m-0 bi bi-person"  > { item["profile"]["cus_name"] } </p>
                                        <h6 className="mt-2 m-0 "> { item["description"] } </h6>
                                        <StarRatings rating={parseFloat(item['rating'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />
                                    </li>
                                )
                            })
                        )
                        :
                        (<span></span>)
                }
            </ul>
        </div>
    );
};

export default ProductReview;