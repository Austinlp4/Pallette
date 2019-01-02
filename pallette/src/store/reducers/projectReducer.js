// import { ADD_PHOTO } from '../actions/projectActions';

const initState = {


}


const projectReducer = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_PHOTO':
            console.log(`added photo`, action.photo)
            return state;
        case 'ADD_PHOTO_ERROR':
            console.log('create project error', action.err);
            return state;
        case 'ADD_UPLOAD':
            console.log('upload pro pic', action.image);
            return state;
        case 'ADD_UPLOAD_ERROR':
            console.log('upload pro pic error', action.err);
            return state;
        case 'ADD_BIO':
            console.log('add bio success', action.bio);
            return state;
        case 'ADD_BIO_ERROR':
            console.log('add bio error', action.err);
            return state;
        default:
           return state;
    }
}


export default projectReducer;