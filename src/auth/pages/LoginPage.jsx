import React, {useMemo, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom"
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import AuthLayout from "../layout/AuthLayout.jsx";
import {useForm} from "../../hooks/index.js";
import {checkAuth, startGoogleSingIn, startLoginWithEmailAndPassword} from "../../store/auth/thunks.js";
import {formValidations} from "../../utils/index.js";

const initialState = {
    email:'',
    password:'',
    emailValid: {isValid: false, message: ''},
    passwordValid: {isValid: false, message: ''},
}


export const LoginPage = () => {
    const [{formSubmitted,formStarted}, setFormStatus] = useState({formSubmitted: false, formStarted: false})

    const {status, errorMessage, ...userRest} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {email, password, onInputChange, emailValid, passwordValid, formState, onResetForm} = useForm(
        initialState, formValidations);


    const {isAuth, isChecking, isUnAuth} = useMemo(() => ({
        isAuth: status === 'authenticated',
        isChecking: status === 'checking',
        isUnAuth: status === 'unauthenticated'
    }), [status]);

    const formValid = useMemo(() => (emailValid.isValid && passwordValid.isValid),
        [emailValid.isValid, passwordValid.isValid]);

    const handlerSubmit = (event) => {
        event.preventDefault();
        setFormStatus({formSubmitted: true, formStarted: true});
        if(!formValid) {
            setFormStatus({formSubmitted: false, formStarted: true})
            return;
        }
        dispatch(startLoginWithEmailAndPassword(email, password));
        onResetForm();
        setFormStatus({formSubmitted: false, formStarted: false})

    }

    const handlerChangeForm = (event) =>
    {
        setFormStatus({formSubmitted: false, formStarted: true});
        onInputChange(event);
    }


    const handlerGoogleSingIn = () => {
        dispatch(startGoogleSingIn());
    }

    return (
        <AuthLayout title={"Login"}>
            <form onSubmit={handlerSubmit} className={'animate__animated animate__fadeIn animate__faster'} aria-label={"submitLoginForm"}>
                {(formStarted) && <h2 style={{color:`${formValid?'green':'red'}`}}>{formValid?'Valid Form':'Invalid Form'}</h2>}
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} container spacing={1} mt={1}>
                        <TextField
                            label={'Email'}
                            type={'text'}
                            name={'email'}
                            placeholder={initialState.email}
                            fullWidth
                            value={email}
                            onChange={handlerChangeForm}
                            error={!emailValid.isValid && !formSubmitted && formStarted}
                            helperText={(!emailValid.isValid && !formSubmitted) ? emailValid.message : ''}
                        ></TextField>
                    </Grid>

                    <Grid item xs={12} md={12} container spacing={1} mt={1}>
                        <TextField
                            label={'Password'}
                            type={'text'}
                            name={'password'}
                            placeholder={initialState.password}
                            fullWidth
                            value={password}
                            onChange={handlerChangeForm}
                            error={!passwordValid.isValid && !formSubmitted && formStarted}
                            helperText={(!passwordValid.isValid && !formSubmitted) ? passwordValid.message : ''}
                        />
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        sx={{mb: 1, mt: 1}}
                    >
                        <Grid item xs={12} sm={12} md={12} hidden={formStarted || isChecking || (!isAuth && !!!errorMessage)}>
                            {(!isAuth) && <Alert severity={('error')}>{(!!errorMessage) ? errorMessage : ''}</Alert>}
                            {(isAuth) && <Alert severity={('success')}>{`User ${userRest.email} has been logged`}</Alert>}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                variant={'contained'}
                                fullWidth
                                type={"submit"}
                                disabled={formSubmitted}
                                aria-label={'btnLoginLabel'}
                            >Login</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant={'contained'}
                                fullWidth onClick={handlerGoogleSingIn}
                                disabled={formSubmitted}
                                aria-label={'btnGoogleLabel'}
                            >
                                <Google/>
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction={"row"}
                        justifyContent={'end'}
                    >
                        <Link component={RouterLink} to={"/auth/register"} color={"inherit"}>Create an account</Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
