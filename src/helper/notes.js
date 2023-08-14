import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {firebaseDb} from "../../firebase/index.js";

export const getAllNotes = async (uuid) => {
    const responseNotes = [];
    if (!uuid) return responseNotes;
    try {
        const notesReference = await collection(firebaseDb, `/${uuid}/journal/notes`);
        const notesSnapshot = await getDocs(notesReference)
        return notesSnapshot.docs.map(note => {
            return {...note.data(), id: note.id}
        });
    } catch (e) {
        console.log(e);
    }
    return responseNotes;
}


export const saveNote = async (note, uuid) => {
    if (!uuid) return null;
    const noteReference = await doc(collection(firebaseDb, `/${uuid}/journal/notes`));
    await setDoc(noteReference, note);
    return ({...note, id: noteReference.id});
}


export const updateNote = async (note, uuid) => {
    if (!uuid) return null;
    try {
        const noteReference = await doc(collection(firebaseDb, `/${uuid}/journal/notes`), note.id);
        await setDoc(noteReference, note);
        return note;
    }
    catch (e) {return null;}
}