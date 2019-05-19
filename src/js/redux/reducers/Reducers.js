import * as types from '../actions/Action';
import getData from '../actions/getData';

import {combineReducers} from 'redux';

const initialState = {
    value:''
}

const SearchBar = ( state = initialState, action) => {
    switch(action.type){
        case types.CHANGE_SEARCH:
            return {...state, value : action.target.value}
        default:
        return state;
    }
}

const rootReducer = combineReducers({
    SearchBar, getData
})

export default rootReducer;
