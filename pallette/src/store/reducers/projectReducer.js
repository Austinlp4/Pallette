// import { ADD_PHOTO } from '../actions/projectActions';

const initState = {


}


const projectReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_PHOTO':
            console.log(`added photo`, action.photo)
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        default:
           return state;
    }
}


export default projectReducer;