import { create } from 'zustand'
import axios from "axios";

const productStore = create((set)=>({
    productSliderList: null,
    productSliderListRequest : async () =>{
        let res = await axios.get(`/api/v1/product-slider-list`);
        if (res.data["status"]==="success"){
            set({productSliderList:res.data["data"]})
        }
    },
    productCategoryList : null,
    productCategoryListRequest : async () =>{
        let res = await axios.get(`/api/v1/product-category-list`);
        if (res.data["status"]==="success"){
            set({productCategoryList:res.data["data"]})
        }
    },
    productBrandList : null,
    productBrandListRequest : async () =>{
        let res = await axios.get(`/api/v1/product-brand-list`);
        if (res.data["status"]==="success"){
            set({productBrandList:res.data["data"]})
        }
    },
    listByRemark : null,
    listByRemarkRequest : async (remark) =>{
        set({listByRemark:null})
        let res = await axios.get(`/api/v1/productRemark/${remark}`);
        if (res.data["status"]==="success"){
            set({listByRemark:res.data["data"]})
        }
    },

    ListProduct:null,
    ListByBrandRequest:async(BrandID)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/product-by-brand-list/${BrandID}`);
        console.log(res)
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    ListByCategoryRequest:async(categoryID)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/product-by-category-list/${categoryID}`);
        console.log(res)
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },

    ListByKeywordRequest:async(keyword)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/search/${keyword}`);
        console.log(res)
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },

    searchKeyword : '',
    setSearchKeyword : async (keyword)=>{
        set({searchKeyword:keyword})
    },

    filterDataRequest : async (postbody) =>{
        let res = await axios.post(`/api/v1/product-filter-list`,postbody)
        if (res.data["status"]==="success"){
            set({filterData:res.data["data"]})
        }
    },

    productDetails : null,
    productDetailsRequest : async (productID) =>{
        let res = await axios.get(`/api/v1/product-details/${productID}`);
        if (res.data["status"]==="success"){
            set({productDetails:res.data["data"]})
        }
    },
    productReview : null,
    productReviewRequest : async (productID) =>{
        let res = await axios.get(`/api/v1/review-details/${productID}`);
        if (res.data["status"]==="success"){
            set({productReview:res.data["data"]})
        }
    }




}))


export default productStore;