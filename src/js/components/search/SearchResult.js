import React from 'react';
import UI from '../ui';
import BasicInfo from '../info/BasicInfo';
import MoveInfo from '../info/MoveInfo';
import EvolutionInfo from '../info/EvolutionInfo';
import AbilityInfo from '../info/AbilityInfo';

class SearchResult extends React.Component {

    render() {
        const res= this.props.result;
        return (
            <div>
                <UI.Box>
                    <BasicInfo data={res}/>
                </UI.Box>
                <UI.Box>
                    <AbilityInfo data={res.abilities}/>
                </UI.Box>
                <UI.Box>
                    <MoveInfo data={res.moves}/>
                </UI.Box>
                <UI.Box>
                    <EvolutionInfo data={res.evolution} 
                                   handleClick={this.props.handleClick}/>
                </UI.Box>
            </div>
        );
    }
}

export default SearchResult;    