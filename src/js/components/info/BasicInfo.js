import React from 'react';
import Languages from '../../config/languageConfig';
import UI from '../ui';

class BasicInfo extends React.Component {

    constructor(props){
        super(props);
        this.state={
            bInfo:(<div></div>)
        }
    }

    componentDidMount(){
        const data = {
            name: this.props.data.name.length === 11 ?
                this.props.data.name[Languages.korean - 1].name :
                this.props.data.name[Languages.korean - 2].name,
            genus: this.props.data.genera.length === 11 ?
                this.props.data.genera[Languages.korean - 1].genus :
                this.props.data.genera[Languages.korean - 2].genus,
            front_image: this.props.data.images.front_default,
            back_image: this.props.data.images.back_default,
            weight: `${this.props.data.body.weight / 10}kg`,
            height: `${this.props.data.body.height / 10}m`,
            stats: this.props.data.stats.map((key) => {
                return (<li className="d-flex justify-content-between">
                    <p>{key.stat.name}</p>
                    <p>{key.base_stat}</p>
                </li>)
            }),
            pokedexNo: (this.props.data.pokedexNo.length !== 1) ?
                this.props.data.pokedexNo[this.props.data.pokedexNo.length - 1].entry_number :
                this.props.data.pokedexNo[0],
            types: this.props.data.types.map((e) => {
                return (<p className={`type-${e.name} ml-1 mr-1`}>{e.names[Languages.korean - 2].name}</p>)
            }),
            flavorText: this.props.data.flavorText.map((e) => {
                return (<div className="row d-flex justify-content-between border-bottom align-items-center">
                    <p className="col-3 font-weight-bold">{e.version.name}</p>
                    <p className="col-9">{e.flavor_text}</p>
                </div>)
            })
        }

        this.setState({bInfo:data});
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="row w-75">
                    <div className="col-md-2 d-flex justify-content-center">
                        {this.state.bInfo.front_image!==null?<img src={this.state.bInfo.front_image} />:
                        <i className="fas fa-cat fa-5x mb-3 binfo-cat-icon text-center"></i>}
                        {this.state.bInfo.back_image != null && <img src={this.state.bInfo.back_image} />}
                    </div>
                    <div className="col-md-5 d-flex justify-content-center flex-column">
                        <p className="h3 mr-3 text-center">No.{this.state.bInfo.pokedexNo}</p>
                        <p className="h2 text-center">{this.state.bInfo.name}</p>
                        <div className="d-flex justify-content-center">
                            {this.state.bInfo.types}
                        </div>
                    </div>
                    <div className="col-md-5 d-flex justify-content-center flex-column align-item-center">
                            <div className="d-flex justify-content-center">
                            <p className="mr-1">{this.state.bInfo.weight}</p>
                            <p className="ml-1">{this.state.bInfo.height}</p>
                            </div>
                        <p className="text-center">{this.state.bInfo.genus}</p>
                    </div>
                </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-3">
                        <h3 className="mb-0 text-center">stats</h3>
                        <UI.subBox>
                            <ul>{this.state.bInfo.stats}</ul>    
                        </UI.subBox>
                        </div>
                         <div className="col-md-9">
                        <h3 className="mb-0 text-center">text</h3>
                        <UI.subBox>
                            {this.state.bInfo.flavorText}
                        </UI.subBox>
                        </div>
                    </div>
            </div>
        )
    }
}

export default BasicInfo;