import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/Action';

import { getSearchResults } from '../../redux/actions/getData';

const mapStateToProps = (state) => {
    return {
        value:state.SearchBar.value,
        pending: state.getData.pending,
        error: state.getData.error,
        result: state.getData.result
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeSearch: (event) => { dispatch(actions.changeSearch(event))},
        clickSearch:(event, input) => { 
            event.preventDefault();
            dispatch(getSearchResults(input));
            }        
    };
};


class SearchBar extends React.Component {

    
    render(){
        return(
            <form className="container-fluid d-flex justify-content-center pb-5 bg-dark">
                <input type="text" className="s-bar" placeholder="Search with No. or Name"
                    onChange={(e)=>{this.props.changeSearch(e)}}/>
                <input type="submit" className="s-button" value="검색" onClick={(e)=>{this.props.clickSearch(e, this.props.value)}}/>
            </form>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);