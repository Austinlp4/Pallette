export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        });
    }
}


export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS'});
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirebase();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            console.log(response)
            return firebase.database().ref(`users/${response.user.uid}`).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                followers: newUser.followers,
                facebook: newUser.facebook,
                instagram: newUser.instagram,
                twitter: newUser.twitter           
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR' })
        })
    }
}

export const signUpWithGoogle = (newUser) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/admin.directory.customer')
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            let token = result.credential.accessToken;

            console.log('user', result.user)
        })
        // .then((response) => {
        //     return firebase.database().ref(`users/${response.user.uid}`).set({
        //         firstName: newUser.firstName,
        //         lastName: newUser.lastName,
        //         followers: newUser.followers,
        //         facebook: newUser.facebook,
        //         instagram: newUser.instagram,
        //         twitter: newUser.twitter 
        //     })
        // })
        // .then(() => {
        //     dispatch({ type: 'SIGNUP_SUCCESS' })
        // }).catch((err) => {
        //     dispatch({ type: 'SIGNUP_ERROR' })
        // })
    }
}