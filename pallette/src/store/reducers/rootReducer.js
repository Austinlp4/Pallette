import authReducer from './authReducer';
import projectReducer from './projectReducer';
import paletteReducer from './paletteReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    palette: paletteReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;