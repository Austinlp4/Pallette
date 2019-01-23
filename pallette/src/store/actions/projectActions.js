
export const addPhoto = (files, uid, title, artist, created, palette) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firebase = getFirebase();
        const storage = firebase.storage();
        storage.ref(`images/${uid}/${files.name}`).put(files)
        // uploadTask.on('state_changed', 
        .then((response) => {
            //complete function
            console.log(response)
            storage.ref('images').child(`${uid}/${files.name}`).getDownloadURL()
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
                    palette,
                    likedBy: {}
                }).then((res) => {
                firebase.database().ref(`photos/${uid}`).child(`${res.key}`).update({
                    id: res.key
                })
                })
            })
            .then(() => {
                dispatch({ type: 'ADD_PHOTO', files })
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

export const addComment = (key, uid, name, url, comment, useruid) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        let commentObj = {
            useruid,
            url,
            name, 
            comment
        };
        let rootRef = firebase.database().ref(`photos/${uid}/${key}/comments`);
        // rootRef.on('value', data => {
        //     comments = data.val().views + 1;
        // })
        console.log('comment', commentObj)
        rootRef.push(commentObj);
    }
}

export const removePhoto = (key, uid) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        let rootRef = firebase.database().ref(`photos/${uid}/${key}`);
        rootRef.remove();
    }
}

export const addLike = (key, uid, auth) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        let likes = 0;
        let rootRef = firebase.database().ref(`photos/${uid}/${key}`);
        rootRef.on('value', data => {
            if(data.val().likedBy && Object.values(data.val().likedBy).indexOf(auth) > -1){
                likes = data.val().likes;
            } else {
            likes = data.val().likes + 1
            }
        })
        console.log('views', likes)
        rootRef.update({likes: likes, likedBy: {auth}});
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

export const editInfo = (firstName, lastName, bio, facebook, instagram, twitter, uid) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const ref = firebase.database().ref(`users/${uid}`);
        ref.update({ 
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            facebook: facebook,
            instagram: instagram,
            twitter: twitter
         })
         
    }
}
