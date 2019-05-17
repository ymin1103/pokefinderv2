export const CHANGE_SEARCH = 'CHANGE_SEARCH'
export const CLICK_SEARCH = 'CLICK_SEARCH'
export const CLICK_POKEMON = 'CLICK_POKEMON'

export const appFlags = {
    IS_INITIATED:'IS_INITIATED',
    IS_LOADING:'IS_LOADING'
}

export const clickPokemon = (event) => {
    return { type:CLICK_POKEMON,
             event:event }
}

export const clickSearch = (event, input) => {
    return { type: CLICK_SEARCH,
             event:event,
             input:input }
}

export const changeSearch = (event) => {
    return {
        type: CLICK_SEARCH,
        event: event
    }
}