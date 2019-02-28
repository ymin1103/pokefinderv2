import React from 'react';

const UI = {

    Box: (props) => {
        return (
            <div className="container-fluid bg-light shadow-sm w-75 align-center pb-4 pt-4 mb-3 mt-3">
            {props.children}
            </div>
        )
    },

    subBox: (props) => {
        return (
            <div className="bg-white align-center mh-50 pt-4 pl-4 pr-4 mb-3 mt-3">
                {props.children}
            </div>
        )
    },

    movesubBox: (props) => {
        return (
            <div className="container-fluid align-center mh-50 pl-0 pr-0 mb-3 mt-3 limit-height">
                {props.children}
            </div>
        )
    },

    toggleButton: (props) => {
        let ArrowDirection = props.toggleVal === true ? "up" : "down";
        return (<i className={`fas fa-arrow-${ArrowDirection}`} onClick={props.ClickEvent}></i>)
    }
}

export default UI;