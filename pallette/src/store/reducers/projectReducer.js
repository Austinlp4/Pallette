// import { ADD_PHOTO } from '../actions/projectActions';

const initState = {


}


const projectReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_PHOTO':
        console.log(`added photo`, action.photo)
    }
    return state
}


export default projectReducer;