import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import Loading from './components/Loading';
import Hello from './components/Hello';
import Error from './components/Error';
import '../scss/index.scss';

class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            data:{id:-1,
                  searching:false
                }
        }
        this.handleClick=this.handleClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({ val: e.target.value });
        e.preventDefault();
    }

    async handleClick(e){
        e.preventDefault();
        this.setState({searching:true});
        let gotData = await Search.GetData(this.state.val);
        this.setState({data:gotData, searching:false});
    }

    async handleArrowClick(num){
        let destination = this.state.data.id + num;
        this.setState({ searching: true });
        if (this.state.data.id === -1 || this.state.data.id === 0)
        {   
            destination = 1;
        }
        else if(destination>807)
        {
            destination = destination - 807;
        }
        else if(destination<=0){
            destination = destination + 807;
        }
        let gotData = await Search.GetData(destination);
        this.setState({ data: gotData, searching: false });
    }

    render(){
        return (
            <div>
                <header class="text-center pb-3 bg-dark">
                    <h1 class="display-4 font-weight-light text-white">PokeFinder</h1>
                </header>
                    <SearchBar ChangeEvent={this.handleChange} ClickEvent={this.handleClick}/>
                    <div className="d-flex justify-content-center pb-3 bg-dark text-white">
                        <i className="fas fa-angle-double-left fa-2x mr-4 border-bottom" onClick={() =>{this.handleArrowClick(-5)}}></i>
                        <i className="fas fa-angle-left fa-2x mr-4 ml-4 border-bottom" onClick={()=>{this.handleArrowClick(-1)}}></i>
                        <i className="fas fa-angle-right fa-2x mr-4 ml-4 border-bottom" onClick={()=>{this.handleArrowClick(1)}}></i>
                        <i className="fas fa-angle-double-right fa-2x ml-4 border-bottom" onClick={()=>{this.handleArrowClick(5)}}></i>
                    </div>
                { this.state.data.id!==0 ?
                    this.state.data.id!==-1 ?
                        this.state.searching===false ?
                            <SearchResult result={this.state.data}/>
                            :<Loading/>
                        :<Hello/>
                    : <Error/>
                }
                <footer class="text-center pb-3 bg-dark">
                    <p class="h4 font-weight-light text-white">Made by ymin1103.</p>
                    <p class="h4 font-weight-light text-white">Used Pokeapi v2.0.</p>
                </footer>
            </div>    
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#main'));




