import {authSlice, checkinCredentials, login, logout} from "../../../src/store/auth/index.js";
import {
    authenticatedState,
    checkingState,
    initialState,
    unauthenticatedState,
    userTest
} from "../../helper/Fixtures/authFixtures.js";
import {checkAuth} from "../../../src/store/auth/thunks.js";

describe('Testing authSlice', () => {
    test("Test initial state", () => {
        expect(authSlice.name).toBe("auth");
        const state = authSlice.reducer(initialState,{});
        expect(state).toEqual(initialState);
    });

    test("Test checkinCredentials", () => {
        const sliceResponse = authSlice.reducer(initialState,checkinCredentials())
        expect(sliceResponse).toEqual(checkingState);
    });

    test("Test login", () => {
        const sliceResponse = authSlice.reducer(initialState,login(userTest))
        expect(sliceResponse).toEqual(authenticatedState);
    });

    test("Test logout", () => {
        const sliceResponse = authSlice.reducer(initialState,logout())
        console.log()
        expect(sliceResponse).toEqual(unauthenticatedState);
    });

    test("Test logout with error errorMessage", async () => {
        const sliceResponse = authSlice.reducer(initialState,logout({errorMessage: "Test error message"}))
        expect(sliceResponse).toEqual({...unauthenticatedState, errorMessage: "Test error message"});
    });

});