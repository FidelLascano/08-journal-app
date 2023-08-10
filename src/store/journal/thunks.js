import {firebaseDb} from "../../../firebase/config.js";
import {setDoc, doc, collection} from "firebase/firestore"
import {addEmptyNote, savingNewNote, setActiveNote} from "./journalSlice.js";
export const saveEmptyNoteT = (note) => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        const userAuth = getState().auth;
        const noteReference = await doc(collection(firebaseDb,`/${userAuth.uuid}/journal/notes`));
        console.log(noteReference.id);
        await setDoc(noteReference, note);
        const noteSaved ={...note, id: noteReference.id}
        dispatch(addEmptyNote(noteSaved));
        return dispatch(setActiveNote(noteSaved))

    }
};