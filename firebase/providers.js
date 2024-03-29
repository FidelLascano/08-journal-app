import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import {firebaseAuth} from "./config";

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const signInWithGoogle = async () => {
    try {
        const singInDetails = await signInWithPopup(firebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(singInDetails);
        const {uid, displayName, email, photoURL, accessToken} = singInDetails.user;
        return {
            ok: true
            , uid
            , displayName
            , email
            , photoURL
            , accessToken
        };
    } catch (error) {
        return {
            ok: false
            , errorMessage: error.message
        };
    }
}


export const startSignUpWithEmailAndPassword = async (emailReg, password, displayNameReg) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, emailReg, password);
        await updateProfile(firebaseAuth.currentUser, {displayName: displayNameReg});
        const {
            uid,
            displayName,
            email,
            photoURL,
            accessToken
        } = userCredential.user;

        return {
            ok: true
            , uid
            , displayName
            , email
            , photoURL
            , accessToken
        };


    } catch (error) {
        return {
            ok: false
            , errorMessage: error.message
        };
    }
}


export const loginWithEmailAndPassword = async (email_v, password_v) => {
    try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email_v, password_v);
        const {
            uid,
            displayName,
            email,
            photoURL,
            accessToken
        } = userCredential.user;

        return {
            ok: true
            , uid
            , displayName
            , email
            , photoURL
            , accessToken
        };
    } catch (error) {
        return {
            ok: false
            , errorMessage: error.message
        };
    }
}


export const startFirebaseLogout = async () => {
    try {
        await firebaseAuth.signOut();
        return {ok: true};
    } catch (error) {
        return {
            ok: false
            , errorMessage: error.message
        };
    }
};
