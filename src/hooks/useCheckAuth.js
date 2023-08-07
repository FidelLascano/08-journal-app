import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "../../firebase/config.js";
import {login, logout} from "../store/auth/";

export const useCheckAuth = () => {
    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            if (!user) return dispatch(logout({errorMessage: "You are not logged in"}));
            const {uid, email, displayName, photoURL} = user;
            return dispatch(login({email, displayName, photoURL, uuid: uid}));
        });
    }, []);

    return status;
}