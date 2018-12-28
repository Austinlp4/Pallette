export const addPhoto = (photo, uid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const storage = firebase.storage();
        storage.ref(`images/PkGhCdyplwNQXlgKKeFjc8SL3i32/${photo.name}`).put(photo)
        .then(() => {
            dispatch({ type: 'ADD_PHOTO', photo })
        })
        .catch((err) => {
            dispatch({ type: 'ADD_PHOTO_ERROR', err })
        })
    }
};