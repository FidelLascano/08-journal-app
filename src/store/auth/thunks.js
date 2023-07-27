import {checkinCredentials, login, logout} from "./authSlice.js";
import {signInWithGoogle, signInWithEmailAndPassword} from "../../../firebase/providers.js";

export const checkAuth = (email, password) => {
    return async (dispatch) => {
        console.log("checkAuth")
        dispatch(checkinCredentials());
    }
}

export const startGoogleSingIn = () => {
    return async (dispatch) => {
        console.log("StartGoogleSingIn")
        dispatch(checkinCredentials());
        const googleResult = await signInWithGoogle();
        if (!googleResult.ok) return dispatch(logout({errorMessage: googleResult.errorMessage}));
        else {
            const payload =
                {
                    uuid: googleResult.uid
                    , email: googleResult.email
                    , displayName: googleResult.displayName
                    , photoURL: googleResult.photoURL
                    , accessToken: googleResult.accessToken
                }

            return dispatch(login(payload));
        }
    }
}


export const startSignInWithEmailAndPassword = (email, password, displayName) =>
{
    return async (dispatch) =>
    {
        console.log("StartEmailSingIn")
        dispatch(checkinCredentials());
        const startSingInWithEmailAndPasswordResult =  await signInWithEmailAndPassword(email, password, displayName);
        if (!startSingInWithEmailAndPasswordResult.ok) return dispatch(logout({errorMessage: startSingInWithEmailAndPasswordResult.errorMessage}));
        else {
            const payload =
                {
                    uuid: startSingInWithEmailAndPasswordResult.uid
                    , email: startSingInWithEmailAndPasswordResult.email
                    , displayName: startSingInWithEmailAndPasswordResult.displayName
                    , photoURL: startSingInWithEmailAndPasswordResult.photoURL
                    , accessToken: startSingInWithEmailAndPasswordResult.accessToken
                }

            return dispatch(login(payload));
        }
    }
}