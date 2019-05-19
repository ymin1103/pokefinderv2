export const CHANGE_SEARCH = 'CHANGE_SEARCH'
export const CLICK_POKEMON = 'CLICK_POKEMON'

export const mode = {
    init: 'INIT_MODE',
    search: 'SEARCH_MODE',
    display: 'DISPLAY_MODE'
}

export const clickPokemon = () => {
    return { type:CLICK_POKEMON
        }
}

export const changeSearch = (event) => {
    return {
        type: CHANGE_SEARCH,
        target:event.target
    }
}