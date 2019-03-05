import React from 'react';
import UI from './components/ui';

class Results extends React.Component {


    getResults(){
        const SR = this.props.searchResults.map((e)=>{
            return(
                <p>{e.name}</p>
            )
        })

        return SR;
    }

    render(){
        const Results = this.getResults();
        return(
            <UI.Box>
            {Results}
            </UI.Box>
        )
    }
}

export default Results;