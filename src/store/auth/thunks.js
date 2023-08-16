import {checkinCredentials, login, logout} from "./authSlice.js";
import {
    loginWithEmailAndPassword,
    signInWithGoogle,
    startFirebaseLogout,
    startSignUpWithEmailAndPassword
} from "../../../firebase/providers.js";
import {resetJournalState} from "../journal/index.js";

export const checkAuth = (email, password) => {
    return async (dispatch) => {
        dispatch(checkinCredentials());
    }
}

export const startGoogleSingIn = () => {
    return async (dispatch) => {
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


export const startCreateWithEmailAndPassword = (email, password, displayName) =>
{
    return async (dispatch) =>
    {
        dispatch(checkinCredentials());
        const startSingInWithEmailAndPasswordResult =  await startSignUpWithEmailAndPassword(email, password, displayName);
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

export const startLoginWithEmailAndPassword =  (email, password) => {
    return async (dispatch) =>
    {
        dispatch(checkinCredentials());
        const authResult = await  loginWithEmailAndPassword(email, password);
        if (!authResult.ok) return dispatch(logout({errorMessage: authResult.errorMessage}));
        else {
            const payload =
                {
                    uuid: authResult.uid
                    , email
                    , displayName: authResult.displayName
                    , photoURL: authResult.photoURL
                    , accessToken: authResult.accessToken
                }

            return dispatch(login(payload));
        }
    }
}


export const startLogout = () => {
    return async (dispatch, getState) => {
        dispatch(checkinCredentials());
        const logoutResponse= await startFirebaseLogout();
        if (!logoutResponse.ok)
        {
            return dispatch(logout({errorMessage: logoutResponse.errorMessage}));
        }
        dispatch(logout({errorMessage: null}));
        dispatch(resetJournalState());
    }
}