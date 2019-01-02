
export const addPhoto = (photo, uid, title, artist, created, palette) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const storage = firebase.storage();
        storage.ref(`images/${uid}/${photo.name}`).put(photo)
        // uploadTask.on('state_changed', 
        .then((response) => {
            //complete function
            console.log(response)
            storage.ref('images').child(`${uid}/${photo.name}`).getDownloadURL()
            .then((url) => {
                let key = firebase.database().ref(`photos/${uid}`).push().key;
                firebase.database().ref(`photos/${uid}`).push({
                    uid,
                    id: key,
                    url,
                    title,
                    artist,
                    likes: 0,
                    pPoints: 0,
                    views: 0,
                    created,
                    palette
                }).then((res) => {
                firebase.database().ref(`photos/${uid}`).child(`${res.key}`).update({
                    id: res.key
                })
                })
            })
            .then(() => {
                dispatch({ type: 'ADD_PHOTO', photo })
            })
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

export const addView = (key, uid) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        let views = 0;
        let rootRef = firebase.database().ref(`photos/${uid}/${key}`);
        rootRef.on('value', data => {
            views = data.val().views + 1;
        })
        console.log('views', views)
        rootRef.update({views});
    }
}

export const addLike = (key, uid) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        let views = 0;
        let rootRef = firebase.database().ref(`photos/${uid}/${key}`);
        rootRef.on('value', data => {
            views = data.val().views + 1;
        })
        console.log('views', views)
        rootRef.update({views});
    }
}

export const addBio = (bio, uid) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const ref = firebase.database().ref(`users/${uid}`);
             ref.update({bio})
             .then(() => {
                 dispatch({ type: 'ADD_BIO', bio })
             })
             .catch((err) => {
                dispatch({ type: 'ADD_BIO_ERROR', err })
            }) 
    }
}
