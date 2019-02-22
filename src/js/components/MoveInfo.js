import React from 'react';
import Languages from '../config/languageConfig';
import UI from './ui';

class MoveInfo extends React.Component {

    constructor(props){
        super(props);
        this.state={
            machineToggle:false,
            levelToggle:false,
            tutorToggle:false
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

    handleToggleClick(category){
        if(category==="machine")
        {
            this.setState({
                machineToggle:this.state.machineToggle === false ? true : false
            })
        }
        else if (category === "tutor") {
            this.setState({
                tutorToggle:this.state.tutorToggle === false ? true : false
            })
        }
        else if (category === "level-up") {
            this.setState({
                levelToggle:this.state.levelToggle === false ? true : false
            })
        }
    }

    render() {
        return (
            <div className="container-fluid pl-0 pr-0">
                <div className="d-flex justify-content-between mb-3 border-bottom">
                    <h3 className="mb-0">machine</h3>
                    <i class="fas fa-arrow-down" onClick={() => { this.handleToggleClick("machine")}}></i>
                </div>
                { this.state.machineToggle === true &&
                    <UI.movesubBox>
                        <ul>{this.makeMoveData("machine")}</ul>
                    </UI.movesubBox>
                }
                <div className="d-flex justify-content-between mb-3 border-bottom">
                    <h3 className="mb-0">level-up</h3>
                    <i class="fas fa-arrow-down" onClick={() => { this.handleToggleClick("level-up") }}></i>
                </div>
                {this.state.levelToggle === true &&
                    <UI.movesubBox>
                        <ul>{this.makeMoveData("level-up")}</ul>
                    </UI.movesubBox>
                }
                <div className="d-flex justify-content-between mb-3 border-bottom">
                    <h3 className="mb-0">tutor</h3>
                    <i class="fas fa-arrow-down" onClick={() => { this.handleToggleClick("tutor") }}></i>
                </div>
                {this.state.tutorToggle === true &&
                    <UI.movesubBox>
                        <ul>{this.makeMoveData("tutor")}</ul>
                    </UI.movesubBox>
                }
            </div>
        )
    }
}

export default MoveInfo;