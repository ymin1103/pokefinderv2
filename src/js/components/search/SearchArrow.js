import React from 'react';

const SearchArrow = (props) => {

    return(
    <div>
        { props.isInvisible === false &&
        <div className="d-flex justify-content-center pb-3 bg-dark text-white">
            <i className="fas fa-angle-double-left fa-2x mr-4 border-bottom" onClick={()=>props.ClickEvent(-5)}></i>
            <i className="fas fa-angle-left fa-2x mr-4 ml-4 border-bottom" onClick={()=>props.ClickEvent(-1)}></i>
            <i className="fas fa-angle-right fa-2x mr-4 ml-4 border-bottom" onClick={()=>props.ClickEvent(1)}></i>
            <i className="fas fa-angle-double-right fa-2x ml-4 border-bottom" onClick={()=>props.ClickEvent(5)}></i>
        </div>
        }
    </div>
    )
}

export default SearchArrow;