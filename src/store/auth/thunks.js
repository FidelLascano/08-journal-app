import {checkinCredentials, login, logout} from "./authSlice.js";
import {signInWithGoogle} from "../../../firebase/providers.js";

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
                }

            return dispatch(login(payload));
        }
    }
}