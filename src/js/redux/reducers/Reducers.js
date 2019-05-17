import {appFlags} from '../actions';
import { CLICK_SEARCH } from '../actions/Action';

const initialState = {
    isInitiated:false,
    isLoading:false
}

const SearchBar = ( state = initialState, action) => {
    switch(action.type){
        case CHANGE_SEARCH:
            return {...state, value : event.target.value}
        case CLICK_SEARCH:
            return {...state, isLoading : true}
        default:
        return state
    }
}

export default SearchBar;