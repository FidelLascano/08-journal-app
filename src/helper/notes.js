import {collection, doc, getDocs, setDoc, deleteDoc} from "firebase/firestore";
import {firebaseDb} from "../../firebase/index.js";

export const initialNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
    imageUrls: [],
};

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


export const deleteNote = async (note,uuid) => {
    if(note==null || note?.id == null) return;
    try {

        const noteReference = await doc(collection(firebaseDb, `/${uuid}/journal/notes`), note.id);
        await deleteDoc(noteReference);
        return note;
    }
    catch(e) {console.log(e);}
    return null;
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