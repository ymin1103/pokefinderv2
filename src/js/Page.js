import React from 'react';
import SearchResult from './components/search/SearchResult';
import Results from './Results';
import Loading from './components/LoadingPage';
import Hello from './components/HelloPage';
import ErrorPage from './components/ErrorPage';

class Page extends React.Component {

    determinePage(){
        if(this.props.isStarted !== false) // isStarted becomes true when search is executed first time.
        {
            if (this.props.searching === false) // data.id becomes 0 when it fails to search data.
            {
                return(<Results searchResults={this.props.searchResults}/>)
            }
            else {
                return (<Loading />);    
            }
        }
        else {
            return (<Hello />);
        }
    }

    render(){
        const CurrentPage = this.determinePage();
        return (
            <div>
            {CurrentPage}
            </div>
        )
    }
}

export default Page;