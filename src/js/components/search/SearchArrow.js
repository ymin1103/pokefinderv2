import React from 'react';

const SearchArrow = (props) => {
    return(
    <div>
        { props.isInvisible === false &&
        <div className="d-flex justify-content-center pb-3 bg-dark text-white">
            <i className="fas fa-angle-double-left fa-2x mr-4 border-bottom" onClick={props.ClickEvent.dleft}></i>
            <i className="fas fa-angle-left fa-2x mr-4 ml-4 border-bottom" onClick={props.ClickEvent.left}></i>
            <i className="fas fa-angle-right fa-2x mr-4 ml-4 border-bottom" onClick={props.ClickEvent.right}></i>
            <i className="fas fa-angle-double-right fa-2x ml-4 border-bottom" onClick={props.ClickEvent.dright}></i>
        </div>
        }
    </div>
    )
}

export default SearchArrow;