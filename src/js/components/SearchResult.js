import React from 'react';
import UI from './ui';
import BasicInfo from './BasicInfo';
import MoveInfo from './MoveInfo';

class SearchResult extends React.Component {

    render() {
        const res= this.props.result;
        return (
            <div>
                <UI.Box>
                    <BasicInfo data={res}/>
                </UI.Box>
                <UI.Box>
                    <MoveInfo data={res.moves}/>
                </UI.Box>
            </div>
        );
    }
}

export default SearchResult;    