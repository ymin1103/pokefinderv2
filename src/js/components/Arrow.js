import React from 'react';
import Searchdata from '../config/Searchdata';

const Arrow = (props) => {
    const PrevNum = props.data !== 1 ? props.data - 1 : 807;
    const NextNum = props.data !== 807 ? props.data + 1 : 1;
    return(
        <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center hover-animation" onClick={()=>{props.clickEvent(event,PrevNum)}}>
                <i className="fas fa-angle-left fa-2x mr-3"></i>
                <div className="d-flex flex-column">
                    <p className="h4">No. {PrevNum}</p>
                    <p>{Searchdata.HangulNameArray[PrevNum - 1]}</p>
                </div>
            </div>
            <div className="d-flex align-items-center hover-animation" onClick={()=>{props.clickEvent(event,NextNum)}}>
                <div className="d-flex flex-column">
                    <p className="h4">No. {NextNum}</p>
                    <p>{Searchdata.HangulNameArray[NextNum - 1]}</p>
                </div>
                <i className="fas fa-angle-right fa-2x ml-3"></i>
            </div>
        </div>
    )
}

export default Arrow;