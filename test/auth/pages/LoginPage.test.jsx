import {fireEvent, render, screen} from "@testing-library/react";
import {LoginPage} from "../../../src/auth/pages/index.js";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../../../src/store/auth/index.js";
import {unauthenticatedState} from "../../helper/Fixtures/authFixtures.js";

const store = configureStore({
    reducer:{auth: authSlice.reducer,},
    preloadedState: {auth: unauthenticatedState,}
});

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks.js", () => ({
    startGoogleSingIn: () => mockStartGoogleSingIn,
    startLoginWithEmailAndPassword: (email, password) => {
        return () => mockStartLoginWithEmailAndPassword(email, password)
    }}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => (fn) => fn(),
}));
describe('Testing for loginPage', () => {
    beforeEach(() => jest.clearAllMocks());
    test('Test to show the LoginPage component', () => {
        const render_result = render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getAllByText("Login").length).toBeGreaterThan(1);
        const googleBtnLogin = screen.getByLabelText("btnGoogleLabel");
        console.log(googleBtnLogin)
        fireEvent.click(googleBtnLogin);
        expect(mockStartGoogleSingIn).toHaveBeenCalled();
    });

    test('Should to call with email and password', () => {
        const email = "lascano.valencia.fidel@gmail.com";
        const password = "fhalcom2022";
        const render_result = render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );
        const emailInput = screen.getByRole("textbox", {name: "Email"});
        fireEvent.change(emailInput, {target: {value: email}});
        const passwordInput = screen.getByRole("textbox", {name: "Password"});
        fireEvent.change(passwordInput, {target: {value: password}});
        const submitLoginForm = screen.getByLabelText("submitLoginForm");
        fireEvent.submit(submitLoginForm);
        expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    });
});