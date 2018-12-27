export const addPhoto = (photo) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        dispatch({ type: 'ADD_PHOTO', photo })
    }
};