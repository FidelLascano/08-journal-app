import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../../firebase/config.js";
import {login, logout} from "../store/auth/";
import {getNotesT} from "../store/journal/index.js";

export const useCheckAuth = () => {
    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            if (!user) return dispatch(logout({errorMessage: "You are not logged in"}));
            const {uid, email, displayName, photoURL} = user;
            dispatch(login({email, displayName, photoURL, uuid: uid}));
            dispatch(getNotesT());
        });
    }, []);

    return status;
}