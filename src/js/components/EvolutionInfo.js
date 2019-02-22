import React from 'react';
import Tree from '../Tree';
import UI from './ui';

class EvolutionInfo extends React.Component {

    traverse(node, callback) {

        callback(node);
        if (node.child.length !== 0) {
            for (let i = 0; i < node.evolves_to.length; i++) {
                this.traverse(node.evolves_to[i], callback);
            }

        }
    }
    
    makeEvolData(){
        
    }

    render(){
        return(
            <UI.Box>

            </UI.Box>
        )
    }
}