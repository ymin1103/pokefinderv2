import React from 'react';
import UI from './components/ui';
import HelloPage from './components/HelloPage';
import LoadingPage from './components/LoadingPage';
import ErrorPage from './components/ErrorPage';
import SearchResults from './components/search/SearchResults';
import DisplayData from './components/search/DisplayData';

import { connect } from 'react-redux'
import * as actions from './redux/actions/Action';

import { getPokemonData } from './redux/actions/getData';

const mapStateToProps = (state) => {
    return {
        pending: state.getData.pending,
        error: state.getData.error,
        result: state.getData.result,
        pokedata: state.getData.pokedata,
        mode:state.getData.mode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSearch: (event) => { dispatch(actions.changeSearch(event)) },
        clickEvent: (event, input) => {
            event.preventDefault();
            dispatch(getPokemonData(input));
        }
    };
}

const determinePage = (props) => {
    switch(props.pending){
        case true:
            return (<LoadingPage />)
        case false:
            if(props.error===true)return (<ErrorPage/>)
            else{
                if (props.result.length === 0)return(<HelloPage/>);
                else {
                    switch(props.mode){
                        case actions.mode.search:
                        return (
                        <UI.Box>
                            <div className="d-flex flex-wrap">
                                <SearchResults data={props.result} 
                                                clickEvent={props.clickEvent}/>
                            </div>
                        </UI.Box>
                        )
                        case actions.mode.display:
                        return(
                            <DisplayData result={props.pokedata} 
                                            clickEvent={props.clickEvent}/>
                        )
                    }
                }
            }
        }
    }


class Page extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render(){

        const page = determinePage(this.props);

        return (
            <div>
            {page}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);