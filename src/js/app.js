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
            data:{id:0},
            searching: false,
            initiate:false,
            searchResults: [],
            val:""
        }
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleArrowClick=this.handleArrowClick.bind(this);
        
    }

    handleChange(e) {
        this.setState({ val: e.target.value });
        e.preventDefault();
    }

    async handleSearchClick(){
        this.setState({ searching: true, initiate: true }, async ()=>{
            const gotRes = await Search.GetResults(ProcessHangul(this.state.val));
            this.setState({ searchResults: gotRes, searching: false });
        });
        
    }

    async handleClick(event, input = this.state.val){
        event.preventDefault();
        this.setState({ searching: true, initiate : true});
        let gotData = await Search.GetData(input);
        this.setState({data:gotData, searching: false});
    }

    async handleArrowClick(num){
        this.setState({ searching: true, initiate : true });
        let destination = this.state.data.id + num;
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
        this.setState({ data: gotData, searching:false});
    }


    

    omponentDidUpdate(prevProps,prevState){
        if(prevState.val===this.state.val){
        document.getElementsByClassName("s-bar")[0].value = "";
        console.log("component did update");
        }
    }

    render(){
        console.log("render app")
        return (
            <div>
                <header className="text-center pb-3 bg-dark">
                    <h1 className="display-4 font-weight-light text-white">PokeFinder</h1>
                </header>
                <SearchBar isInvisible={this.state.searching}
                           isStarted={this.state.initiate}
                           ChangeEvent={this.handleChange} 
                           ClickEvent={this.handleSearchClick}/>
                <Page
                      isStarted={this.state.initiate}
                      searching={this.state.searching} 
                      searchResults={this.state.searchResults}/>
                <footer className="text-center pb-3 bg-dark">
                    <p className="h4 font-weight-light text-white">Made by ymin1103.</p>
                    <p className="h4 font-weight-light text-white">Used Pokeapi v2.0.</p>
                </footer>
            </div>    
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#main'));





