import React from 'react';
import Languages from '../../config/languageConfig';
import Tree from '../../Tree';
import UI from '../ui';


class EvolutionInfo extends React.PureComponent {
        
    constructor(props){
        super(props);
        this.state={
            eInfo:(<div></div>)
        }
    }

    componentDidMount(){
        /*
        const evolArray = [];

        this.props.data.traverse(this.props.data.root, async (node) => {
            if (node.value.id) {
                const tempObj = {};
                tempObj.name = node.value.names.length === 11 ?
                    node.value.names[Languages.korean - 1].name :
                    node.value.names[Languages.korean - 2].name;
                tempObj.sprite = node.value.sprites.front_default;
                tempObj.id=node.value.id;
                evolArray.push(tempObj);
            }
        })
        const Evoldata = evolArray.map((e) => {
            return (
                <div className="d-flex flex-column justify-content-center">
                    {e.sprite !== null ? 
                        <img className="evol-img" 
                        src={e.sprite} 
                        onClick={()=>this.props.handleClick(event,e.id)}/> :
                        <i className="fas fa-5x fa-cat mb-3" 
                        onClick={() => this.props.handleClick(event, e.id)}></i>}
                    <p className="text-center">{e.name}</p>
                </div>
            )
        })
        */
        
        const Evoldata = this.props.data.map((e)=>{
            return(
                <div className="d-flex flex-column justify-content-center">
                    {e.result.sprites.front_default !== null ?
                    <img src={e.result.sprites.front_default} 
                         alt="No image :("
                         class="evol-img"
                         onClick={() => this.props.handleClick(event, e.result.id)}/>:
                        <i className="fas fa-5x fa-cat mb-3"
                         onClick={() => this.props.handleClick(event, e.result.id)}></i>
                    }
                    <p className="text-center">{e.result.names.length === 11 ?
                            e.result.names[Languages.korean - 1].name :
                            e.result.names[Languages.korean - 2].name}</p>
                </div>
                    )
        })
        

        this.setState({eInfo:Evoldata});
    }

    render(){
        return(
            <div>
            <h3 className="mb-0">Evolution</h3>
                <UI.subBox>
                    <div className="d-flex justify-content-around flex-wrap">
                    {this.state.eInfo}
                    </div>
                </UI.subBox>
            </div>
        )
    }
}

export default EvolutionInfo;