import {createSlice} from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: "",
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: (state, action) => {
            state.isSaving = true;
        },
        addEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        updateNote: (state, action) => {
            state.messageSave = "";
            if (action.payload == null) return;
            const {id} = action.payload;
            const index = state.notes.findIndex(note => (note.id === id));
            state.notes[index] = action.payload;
            setNotes(state.notes);
            state.isSaving = false;
            state.active = action.payload;
            state.messageSave = `Note ${action.payload.title} saved successfully`
        },
        deleteNote: (state, action) => {

        },
        setSaving: (state, action) => {
            state.isSaving = action.payload;
        },
        resetJournalState: (state, action) => {
            state.isSaving = false;
            state.messageSave = "";
            state.notes = [];
            state.active = null;
        }
    }
});

export const {
    resetJournalState,
    savingNewNote,
    addEmptyNote,
    setActiveNote,
    setNotes,
    updateNote,
    deleteNote,
    setSaving
} = journalSlice.actions;