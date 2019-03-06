import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import SearchArrow from './components/search/SearchArrow';
import SearchBar from './components/search/SearchBar';
import Page from './Page';
import '../scss/index.scss';

import ProcessHangul from './ProcessHangul';



class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            searching:false,
            initiate:false,
            searchResults: [],
            displayData:{},
            val:""
        }
        this.handleChange = this.handleChange.bind(this);    
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handlePokemonClick = this.handlePokemonClick.bind(this);
        
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ val: e.target.value });
        
    }

    async handleSearchClick(e){
        e.preventDefault();
        this.setState({searching:true}, async () => {
            const gotRes = await Search.GetResults(ProcessHangul(this.state.val));
            setTimeout(()=>{
                this.setState({ initiate: true, searchResults: gotRes, searching: false });
            },1000)
        });
    }

    async handlePokemonClick(e, input){
        e.preventDefault();
        this.setState({searching:true}, async () =>{
            const gotData = await Search.GetData(input);
            this.setState({displayData:gotData, searching:false})
        })
    }


    render(){
        return (
            <div>
                <header className="text-center pb-3 bg-dark">
                    <h1 className="display-4 font-weight-light text-white">PokeFinder</h1>
                </header>
                <SearchBar 
                           isStarted={this.state.initiate}
                           ChangeEvent={this.handleChange} 
                           ClickEvent={this.handleSearchClick}/>
                <Page isStarted={this.state.initiate} 
                        searchResults={this.state.searchResults}
                        isLoading={this.state.searching}
                        ClickPokemonEvent={this.handlePokemonClick}/>
                <footer className="text-center pb-3 bg-dark">
                    <p className="h4 font-weight-light text-white">Made by ymin1103.</p>
                    <p className="h4 font-weight-light text-white">Used Pokeapi v2.0.</p>
                </footer>
            </div>    
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#main'));





