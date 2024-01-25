import React from 'react';
import featureStore from "../../store/FeatureStore.js";
import LegalSkeleton from "../../skeleton/LegalSkeleton.jsx";
import parse from "html-react-parser"
const Legal = () => {
    const {legalData} = featureStore()
    if (legalData===null){
        return <LegalSkeleton/>
    }else {
        return (
            <div>
                <div className="container mt-3 " >
                    <div className="row" >
                        <div className="col-md-12 " >
                            <div className="card p-5 " >
                                {
                                    parse(legalData[0]["description"])
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default Legal;