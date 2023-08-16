
import {addEmptyNote, savingNewNote, setActiveNote, setNotes, updateNote as updateNoteS} from "./journalSlice.js";
import {getAllNotes, saveNote, updateNote} from "../../helper/notes.js";
import {uploadImages} from "../../helper/cloudinary.js";
export const saveNoteT = (note) => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        const userAuth = getState().auth;
        const noteSaved = await saveNote(note, userAuth.uuid);
        dispatch(addEmptyNote(noteSaved));
        return dispatch(setActiveNote(noteSaved))
    }
};

export const getNotesT = () => {
    return async (dispatch, getState) => {
        const userAuth = getState().auth;
        const responseNotes = await getAllNotes(userAuth.uuid);
        return dispatch(setNotes(responseNotes));
    }
}

export const updateNoteT = (note) =>
{
    return async (dispatch, getState) =>
    {
        dispatch(savingNewNote());
        const userAuth = getState().auth;
        const noteSaved = await updateNote(note, userAuth.uuid);
        dispatch(updateNoteS(noteSaved));
    }
}


export const updateNoteFilesT = (files) =>
{
    return async (dispatch, getState) =>
    {
        dispatch(savingNewNote());
        const {active} = getState().journal;
        const note = {...active};
        const filesSaved = await uploadImages(files);
        if(filesSaved.length === 0) return;
        note.imageUrls = [...note.imageUrls, ...filesSaved];
        dispatch(updateNoteT(note));
    }
}