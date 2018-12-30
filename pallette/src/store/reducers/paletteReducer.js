const initState = {
        palette: []

}


const paletteReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_PALETTE':
            console.log(`added palette`, action.palette)
            return {palette: [...action.palette]};
        case 'ADD_PALETTE_ERROR':
            console.log('add palette error', action.err);
            return state;
        default:
           return state;
    }
}


export default paletteReducer;