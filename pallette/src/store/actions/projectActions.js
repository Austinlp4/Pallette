export const addPhoto = (photo, uid, title, artist) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const storage = firebase.storage();
        let uploadTask = storage.ref(`images/${uid}/${photo.name}`).put(photo);
        uploadTask.on('state_changed', 
        () => {
            //complete function
            storage.ref('images').child(`${uid}/${photo.name}`).getDownloadURL()
            .then((url) => {
                const post = {
                    url,
                    title,
                    artist
                }
                firebase.database().ref(`photos/${uid}`).push({post})
            })
            // .then((post) => {
            //     dispatch({ type: 'ADD_PHOTO', post })
            // })
            .catch((err) => {
                dispatch({ type: 'ADD_PHOTO_ERROR', err })
            })          
        })
    }
};

export const uploadAvatar = (image, uid) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const storage = firebase.storage();

        let uploadTask = storage.ref(`images/${uid}/profilepic/${uid}`).put(image);
        uploadTask.on('state_changed', 
        () => {
            //complete function
            storage.ref('images').child(`${uid}/profilepic/${uid}`).getDownloadURL()
            .then(url => {
                firebase.database().ref(`users/${uid}`).update({url})
            })
            .then(() => {
                dispatch({ type: 'ADD_UPLOAD', image })
            })
            .catch((err) => {
                dispatch({ type: 'ADD_UPLOAD_ERROR', err })
            })          
        })
    }
}