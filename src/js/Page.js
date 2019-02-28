import React from 'react';
import SearchResult from './components/search/SearchResult';
import Loading from './components/LoadingPage';
import Hello from './components/HelloPage';
import ErrorPage from './components/ErrorPage';

class Page extends React.Component {

    render(){
        return (
            <div>
                {
                    this.props.data.id !== 0 ?
                        this.props.data.id !== -1 ?
                            this.props.searching === false ?
                                <SearchResult result={this.props.data} 
                                              handleClick={this.props.handleClick}/>
                                : <Loading />
                            : <Hello />
                        : <ErrorPage />
                }
            </div>
        )
    }
}

export default Page;