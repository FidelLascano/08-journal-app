import {signInWithGoogle, startSignUpWithEmailAndPassword as startCreateWithEmailAndPasswordP} from "../../../firebase/providers.js";
import {checkinCredentials, login, logout} from "../../../src/store/auth/";
import {checkAuth, startCreateWithEmailAndPassword, startGoogleSingIn} from "../../../src/store/auth/thunks.js";


jest.mock("../../../firebase/providers.js");
        const dispatch = jest.fn();
        beforeEach(() => jest.clearAllMocks());
describe('Test auth thunk', () => {
    test("Test firebase google login", async () => {
        //const valor = checkinCredentials()
        await checkAuth()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkinCredentials());
    });

    test("Test firebase google login", async () => {
        const result = {ok: true};
        signInWithGoogle.mockReturnValue(result);
        await startGoogleSingIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkinCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({}));
    });

    test("Test firebase google login failed", async () => {
        const result = {ok: false};
        signInWithGoogle.mockReturnValue(result);
        await startGoogleSingIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkinCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({}));
    });


    test("Test firebase login with email and password", async () => {
        const result = {ok: true};
        startCreateWithEmailAndPasswordP.mockReturnValue(result);
        const response = await  startCreateWithEmailAndPassword("lascano.valencia.fidel", "abc123", "displayName")(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkinCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({}));
    });


    test("Test firebase login with email and password", async () => {
        const result = {ok: false};
        startCreateWithEmailAndPasswordP.mockReturnValue(result);
        const response = await  startCreateWithEmailAndPassword("lascano.valencia.fidel", "abc123", "displayName")(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkinCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({}));
    });
});