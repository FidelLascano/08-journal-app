import {firebaseDb} from "../../../firebase/config.js";\
import {setDoc} from "firebase/firestore"
import {useDispatch, useSelector} from "react-redux";

export const saveNote = (note) => {
    return async (dispatch, getState) => {
        const userAuth = getState().auth;
        const noteReference = await setDoc(firebaseDb.doc(`/${userAuth.uid}/journal/notes`), note);
        dispatch(saveNote(true));
    }
};