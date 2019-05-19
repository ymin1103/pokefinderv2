import { handleActions } from 'redux-actions';

import { mode } from './Action';
import Search from '../../Search';
import ProcessInput from '../../ProcessInput';

const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';
const GET_POKEMON_SUCCESS = 'GET_POKEMON_SUCCESS';

export const getSearchResults = (input) => async dispatch => {
    if(input==='')input=1;
            dispatch({type:'GET_POST_PENDING'});
    const results = await Search.GetResults(ProcessInput(input));
    setTimeout(()=>{
        if (results !== undefined && results.length > 0) {
            dispatch({ type: 'GET_POST_SUCCESS', result: results })
        }

        else {
            dispatch({ type: 'GET_POST_FAILURE' })
        }
    },1000)    
    
}

export const getPokemonData = (input) => async dispatch => {
    if (input === '') input = 1;
    dispatch({ type: 'GET_POST_PENDING' });
    const results = await Search.GetData(input);
        if (results !== undefined) {
            dispatch({ type: 'GET_POKEMON_SUCCESS', pokedata: results })
        }

        else {
            dispatch({ type: 'GET_POST_FAILURE' })
        }
}

const initialState = {
    mode:mode.init,
    pending: false,
    error: false,
    result:[],
    pokedata:{}
}

export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_POST_SUCCESS]: (state, action) => {
        return {
            ...state,
            pending: false,
            error:false,
            result: action.result,
            mode:mode.search
        };
    },
    [GET_POST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    },
    [GET_POKEMON_SUCCESS]: (state, action) => {
        return {
            ...state,
            pending:false,
            error:false,
            pokedata:action.pokedata,
            mode:mode.display
        }
    }
}, initialState);