import React, {useEffect, useMemo, useState} from 'react'
import AuthLayout from "../layout/AuthLayout.jsx";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import {useForm} from "../../hooks/index.js";
import {useDispatch, useSelector} from "react-redux";
import {formValidations} from "../../utils/index.js";
import {startCreateWithEmailAndPassword} from "../../store/auth/thunks.js";

const initialState = {
    email: 'fidekof@gmail.com',
    password: '123456',
    fullName: 'Fidel Lascano'
}
export const RegisterPage = () => {
    const [{formSubmitted,formStarted}, setFormStatus] = useState({formSubmitted: false, formStarted: false})
    const dispatch = useDispatch();
    const {status, errorMessage, ...userRest} = useSelector(state => state.auth);

    const {isAuth, isChecking, isUnAuth} = useMemo(() => ({
        isAuth: status === 'authenticated',
        isChecking: status === 'checking',
        isUnAuth: status === 'unauthenticated'
    }), [status]);


    const {
        email, password, fullName, onInputChange, formState,
        emailValid, passwordValid, fullNameValid, onResetForm
    } = useForm({
        email: '',
        password: '',
        fullName: '',
        emailValid:    {isValid: false, message: ''},
        passwordValid: {isValid: false, message: ''},
        fullNameValid: {isValid: false, message: ''},
    }, formValidations);


    useEffect(() => {
        if(status === "authenticated") {
            onResetForm();
            setFormStatus({formSubmitted: false, formStarted: false});
        }
    }, [status]);

    const formValid = useMemo(() => (emailValid.isValid && passwordValid.isValid && fullNameValid.isValid),
        [emailValid.isValid, passwordValid.isValid, fullNameValid.isValid]);


    const onInputChangeL = (event) => {
        setFormStatus({formSubmitted: false, formStarted: true});
        onInputChange(event);
    }

    const handlerCreateSubmit = (event) => {
        event.preventDefault();
        if (!formValid)
        {
            setFormStatus({formSubmitted: false, formStarted: true});
            return;
        }

        setFormStatus({formSubmitted: true, formStarted: false});
        dispatch(startCreateWithEmailAndPassword(email, password, fullName));
    }

    return (
        <AuthLayout title={"Register"}>
            <form onSubmit={handlerCreateSubmit}>
                {(!formSubmitted && formStarted) &&
                    <h2 style={{color: `${formValid ? 'green' : 'red'}`}}>{formValid ? 'Valid Form' : 'Invalid Form'}</h2>}
                <Grid container spacing={1}>
                    <Grid item xs={12} spacing={1}>
                        <TextField
                            placeholder={initialState.fullName}
                            name={'fullName'}
                            label={'Full Name'}
                            type={'text'}
                            onChange={onInputChangeL}
                            fullWidth
                            value={fullName}
                            error={!fullNameValid.isValid && !formSubmitted && formStarted}
                            helperText={(!fullNameValid.isValid && !formSubmitted) ? fullNameValid.message : ''}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12} spacing={1}>
                        <TextField
                            placeholder={initialState.email}
                            name={'email'}
                            label={'Email'}
                            type={'email'}
                            onChange={onInputChangeL}
                            fullWidth
                            value={email}
                            error={!emailValid.isValid && !formSubmitted && formStarted}
                            helperText={(!emailValid.isValid && !formSubmitted) ? emailValid.message : ''}
                        ></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            placeholder={initialState.password}
                            name={'password'}
                            label={'Password'}
                            type={'password'}
                            value={password}
                            fullWidth
                            onChange={onInputChangeL}
                            error={!passwordValid.isValid && !formSubmitted  && formStarted}
                            helperText={(!passwordValid.isValid && !formSubmitted) ? passwordValid.message : ''}
                        />
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        sx={{mb: 1, mt: 1, pl: 1}}
                    >
                        <Grid item xs={12} sm={12} md={12} hidden={isChecking || (!isAuth && !!!errorMessage)}>
                            {(!isAuth) && <Alert severity={('error')}>{(!!errorMessage) ? errorMessage : ''}</Alert>}
                            {(isAuth) && <Alert severity={('success')}>{`User ${userRest.email} has been registered`}</Alert>}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Button
                                variant={'contained'}
                                fullWidth
                                type={'submit'}
                                disabled={isChecking}
                            >Create Account</Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction={"row"}
                        justifyContent={'end'}
                    >
                        <Link component={RouterLink} to={"/auth/login"} color={"inherit"}>Do you have an account?
                            Login</Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
