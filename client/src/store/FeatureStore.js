import { create } from 'zustand'
import axios from "axios";

const featureStore = create((set)=>({
    featureList : null,
    featureListRequest : async () =>{
        const res = await axios.get(`/api/v1/feature-list`);
        if (res.data["status"]==="success"){
            set({ featureList : res.data["data"] })
        }
    }
}))


export default featureStore;