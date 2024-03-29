import { create } from 'zustand'
import axios from "axios";

const featureStore = create((set)=>({
    featureList : null,
    featureListRequest : async () =>{
        const res = await axios.get(`/api/v1/feature-list`);
        if (res.data["status"]==="success"){
            set({ featureList : res.data["data"] })
        }
    },
    legalData : null,
    legalDataRequest : async (legal) =>{
        set({legalData:null})
        const res = await axios.get(`/api/v1/feature-details/${legal}`);
        if (res.data["status"]==="success"){
            set({ legalData : res.data["data"] })
        }
    }
}))


export default featureStore;