import React from 'react';
import UI from './components/ui';
import HelloPage from './components/HelloPage';
import LoadingPage from './components/LoadingPage';
import ErrorPage from './components/ErrorPage';
import Results from './Results';

class Page extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            searchResults:[]
        }
    }

    componentDidMount() {
        this.setState((props) => { return { searchResults: this.props.searchResults } })
    }

    componentDidUpdate(prevProps){
        if(prevProps.searchResults!==this.props.searchResults)
        {   
            this.setState((props)=>{return{ searchResults:this.props.searchResults}});
        }
    }

    render(){
        return (
            <div>
            {(this.props.isStarted===true||
              this.props.isLoading===true)?
                    this.props.isLoading===false?
                            this.props.searchResults.length>0?
                                    <UI.Box>
                                        <div className="d-flex flex-wrap">
                                        <Results data={this.state.searchResults}/>
                                        </div>
                                    </UI.Box>:
                            <ErrorPage/>:
                    <LoadingPage/>:
            <HelloPage/>
            }
            </div>
        )
    }
}

export default Page;