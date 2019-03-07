import React from 'react';
import UI from './components/ui';
import HelloPage from './components/HelloPage';
import LoadingPage from './components/LoadingPage';
import ErrorPage from './components/ErrorPage';
import SearchResults from './components/search/SearchResults';
import DisplayData from './components/search/DisplayData';

class Page extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            searchResults:[],
            displayData:{},
            mode:"init"
        }
    }

    componentDidMount() {
        this.setState((props) => { return { searchResults: this.props.searchResults } })
    }

    componentDidUpdate(prevProps){
        if(prevProps.searchResults!==this.props.searchResults)
        {   
            this.setState((props)=>{return{ searchResults:this.props.searchResults, mode:"search"}});
        }
        if(prevProps.displayData!==this.props.displayData)
        {
            this.setState((props) => { return { displayData: this.props.displayData, mode:"display"}});
        }
    }

    render(){
        return (
            <div>
            {(this.props.isStarted===true||
              this.props.isLoading===true)?
                    this.props.isLoading===false?
                            this.props.searchResults.length>0?
                                    this.state.mode!=="display"?
                                        <UI.Box>
                                            <h2 className="text-center">Search results</h2>
                                            <div className="d-flex flex-wrap">
                                            <SearchResults data={this.state.searchResults}
                                                     handleClick={this.props.ClickPokemonEvent}/>
                                            </div>
                                        </UI.Box>:
                                        <DisplayData result={this.props.displayData}
                                                   handleClick={this.props.ClickPokemonEvent}/>:
                            <ErrorPage/>:
                    <LoadingPage/>:
            <HelloPage/>
            }
            </div>
        )
    }
}

export default Page;