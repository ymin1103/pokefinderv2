import React from 'react';
import UI from './components/ui';

const Results = (props) => {
    return (
        props.data.map((e) => {
        return(
            <UI.srsubBox>
                <div className="d-flex h-100 align-items-center justify-content-between">
                    <img className="img-res ml-3" src={e.img} />
                    <div className="d-flex justify-content-center w-75">
                        <p className="mr-3">No. {e.id}</p>
                        <h3>{e.name}</h3>
                    </div>
                </div>
            </UI.srsubBox>
            )
        })
    )
}

export default Results;