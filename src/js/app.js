import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import SearchBar from './components/search/SearchBar';
import Page from './Page';
import ProcessInput from './ProcessInput';
import '../scss/index.scss';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers/Reducers';

import ReduxThunk from 'redux-thunk';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, 
      composeEnhancers(applyMiddleware(ReduxThunk)
      ));
    /* eslint-enable */

class App extends React.Component {
    
    constructor(props){
        super(props);
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
                <SearchBar/>
                <Page/>
            </div>    
        )
    }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#main'));





