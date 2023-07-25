import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {firebaseAuth} from "./config";

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const signInWithGoogle = async () => {
    try
    {
        const singInDetails = await signInWithPopup(firebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(singInDetails);
        const {uid, displayName, email, photoURL} = singInDetails.user;
        const credentialResults = {
            ok: true
            , uid
            , displayName
            , email
            , photoURL
        };

        return credentialResults;
    }
    catch (error)
    {
        console.log(error);

        return {
            ok: false
            , errorMessage: error.message
        };
    }
}