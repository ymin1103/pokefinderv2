import React from 'react';
import UI from '../ui';

class MoveInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            toggle:
            {
                machine: false,
                level: false,
                tutor: false
            }
        }
        
    }

    componentDidMount(){
        this.setState({
            toggle:
            {
                machine: false,
                level: false,
                tutor: false
            }
        })
    }

    onClickforTest(category){
        if (category === "machine") {
            this.setState({
                toggle: {
                    tutor: this.state.toggle.tutor,
                    level: this.state.toggle.level,
                    machine: this.state.toggle.machine === false ? true : false
                }
            })
        }
        else if (category === "tutor") {
            this.setState({
                toggle: {
                    machine: this.state.toggle.machine,
                    level: this.state.toggle.level,
                    tutor: this.state.toggle.tutor === false ? true : false
                }
            })
        }
        else if (category === "level-up") {
            this.setState({
                toggle: {
                    machine: this.state.toggle.machine,
                    level: this.state.toggle.level === false ? true : false,
                    tutor: this.state.toggle.tutor
                }
            })
        }
    }

    makeMoveData(condition) {

        const moveData = this.props.data.map((key) => {
            for (let i = 0; i < key.method.length; i++) {
                if (key.method[i].move_learn_method.name === condition &&
                    (key.method[i].version_group.name === "ultra-sun-ultra-moon" ||
                        key.method[i].version_group.name === "sun-moon")) {

                    return (
                        <UI.subBox>
                            <li className="d-flex flex-column justify-content-between">
                                <div className="row d-flex justify-content-between border-bottom">
                                    <div className="col-md-8 d-flex justify-content-around">
                                        {condition === "level-up" &&
                                            <p>Lv.{key.method[0].level_learned_at}</p>
                                        }
                                        <p>{key.names[8].name}</p>
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-between">
                                        <p>{key.power === null ? "-" : key.power}</p>
                                        <p>{key.accuracy === null ? "-" : key.accuracy}</p>
                                        <p className={`type-${key.type.name}`}>{key.type.name}</p>
                                        <p>{key.damage_class.name}</p>
                                    </div>
                                </div>
                                <div className="row pt-2 pb-2">
                                    <p>{key.flavor_text_entries[8].flavor_text}</p>
                                </div>
                            </li>
                        </UI.subBox>)
                }
            }
        })
        return moveData;
    }


    MoveComponent(props){
        return (
            <div>
                <div className="d-flex justify-content-between mb-3 border-bottom">
                    <h3 className="mb-0">{props.value}</h3>
                    <UI.toggleButton 
                    toggleVal={props.toggleVal} 
                    ClickEvent={props.ClickEvent} />
                </div>
                {props.toggleVal === true &&
                    <UI.movesubBox>
                        <ul>{props.data}</ul>
                    </UI.movesubBox>
                }
            </div>
        )
    }

    render() {
        return (
            <div className="container-fluid pl-0 pr-0">
                <this.MoveComponent 
                    toggleVal={this.state.toggle.machine} 
                    ClickEvent={()=>{this.onClickforTest("machine")}}
                    value="machine"
                    data={this.makeMoveData("machine")}/>
                <this.MoveComponent
                    toggleVal={this.state.toggle.level}
                    ClickEvent={() => { this.onClickforTest("level-up") }}
                    value="level-up"
                    data={this.makeMoveData("level-up")} />
                <this.MoveComponent 
                    toggleVal={this.state.toggle.tutor} 
                    ClickEvent={() => { this.onClickforTest("tutor") }}
                    value="tutor"
                    data={this.makeMoveData("tutor")}/>
            </div>
        )
    }

}

export default MoveInfo;