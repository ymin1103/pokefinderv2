import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import SearchBar from './components/search/SearchBar';
import Page from './Page';
import ProcessInput from './ProcessInput';
import '../scss/index.scss';



class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
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
        this.setState({isLoading:true}, async () => {
            const gotRes = await Search.GetResults(ProcessInput(this.state.val));
            setTimeout(()=>{
                this.setState({ initiate: true, searchResults: gotRes, isLoading: false });
            },1000)
        });
    }

    async handlePokemonClick(e, input){
        e.preventDefault();
        this.setState({isLoading:true}, async () =>{
            const gotData = await Search.GetData(input);
            this.setState({displayData:gotData, isLoading:false})
        })
    }

    render(){
        return (
            <div>
                <header className="pb-3 bg-dark d-flex justify-content-center align-items-center">
                    <h1 className="display-4 font-weight-light text-white mr-1">PokeFinder</h1>
                    <a href="https://github.com/ymin1103/pokefinderv2" target="blank">
                        <i class="fab fa-github fa-2x ml-1 text-white hover-animation"></i>
                    </a>
                </header>
                <SearchBar isStarted={this.state.initiate}
                           isLoading={this.state.isLoading}
                           ChangeEvent={this.handleChange} 
                           ClickEvent={this.handleSearchClick}/>
                <Page  isStarted={this.state.initiate} 
                       isLoading={this.state.isLoading}
                       searchResults={this.state.searchResults}
                       displayData={this.state.displayData}
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





