export const addPhoto = (photo) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({ type: 'ADD_PHOTO', photo })
    }
};