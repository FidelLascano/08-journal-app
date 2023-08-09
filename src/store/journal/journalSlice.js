import {createSlice} from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
        messageSave: "",
        notes: [],
        active: null
        /*
        active: {
            id: null,
            title: "",
            body: "",
            date: null,
            imgUrls: []
        }*/
    },
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        updateNote: (state, action) => {
        },
        deleteNote: (state, action) => {

        },
        setSaving: (state, action) => {
            state.isSaving = action.payload;
        }

    }
});

export const {
    addNote,
    setActiveNote,
    setNotes,
    updateNote,
    deleteNote,
    setSaving
} = journalSlice.actions;