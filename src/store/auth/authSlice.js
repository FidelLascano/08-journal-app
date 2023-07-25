import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
   name: 'auth',
    initialState: {
       status: "unauthenticated", // "checking" | "authenticated" | "unauthenticated"
       uuid: null,
       email: null,
       displayName: null,
       photoURL: null,
       errorMessage: null,
    },
    reducers: {
       login: (state, action) => {
           state.status = "authenticated";
           state.uuid = action.payload.uuid;
           state.email = action.payload.email;
           state.displayName = action.payload.displayName;
           state.photoURL = action.payload.photoURL;
           state.errorMessage = null;
       },
        logout: (state, action) => {
           state.status = "unauthenticated";
           state.uuid = null;
           state.email = null;
           state.displayName = null;
           state.photoURL = null;
           state.errorMessage = action.payload.errorMessage;
    },
        checkinCredentials: (state, action) =>
        {
            console.log("checking...")
            state.status = "checking";
            state.uuid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = null;
        }
    }
});

export const {login, logout, checkinCredentials} = authSlice.actions;