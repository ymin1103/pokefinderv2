import React from 'react';
import UI from '../ui';

const SearchResults = (props) => {
    return (
        props.data.map((e) => {
        return(
            <UI.srsubBox>
                <div className="d-flex h-100 align-items-center justify-content-between hover-animation"
                     onClick={()=>{props.handleClick(event, e.id)}}>
                    {e.img!==null?<img className="img-res ml-3" src={e.img} />:
                    <i className="fas fa-4x fa-cat ml-3"></i>}
                    <div className="d-flex flex-column align-items-center justify-content-evenly w-75">
                        <p className="mr-3 mb-0">No. {e.id}</p>
                        <h3>{e.name}</h3>
                        <div className="d-flex justify-content-between w-50">
                        {e.types.map((ele)=>{
                            return(<p className={`mr-1 ml-1 type-${ele.type.name}`}>{ele.type.name}</p>)
                        })}
                        </div>
                    </div>
                </div>
            </UI.srsubBox>
            )
        })
    )
}

export default SearchResults;