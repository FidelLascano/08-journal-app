import React, {useMemo} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom"
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import AuthLayout from "../layout/AuthLayout.jsx";
import {useForm} from "../../hooks/index.js";
import {checkAuth, startGoogleSingIn} from "../../store/auth/thunks.js";

export const LoginPage = () => {
    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const {email, password, onInputChange, formState, onResetForm} = useForm({
        email: 'fidekof@gmail.com',
        password: '123456'
    });

    const isAuth = useMemo(() => status === 'checking', [status]);


    const handlerSubmit = ( event ) => {
        event.preventDefault();
        console.log(formState);
        dispatch(checkAuth(email, password));
    }

    const handlerGoogleSingIn = () => {
        console.log('Google Sing In');
        dispatch(startGoogleSingIn());
    }

    return (
        <AuthLayout title={"Login"}>
                <form onSubmit={handlerSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} spacing={1}>
                            <TextField
                                label={'Email'}
                                type={'email'}
                                placeholder={'email@gmail.com'}
                                fullWidth
                                value={email}
                                onChange={onInputChange}
                            ></TextField>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                label={'Password'}
                                type={'password'}
                                placeholder={'password'}
                                fullWidth
                                value={password}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid
                            container
                            spacing={1}
                            sx={{mb: 1, mt: 1}}
                        >
                            <Grid item xs={12} sm={6} >
                                <Button
                                    variant={'contained'}
                                    fullWidth
                                    type={"submit"}
                                    disabled={isAuth}
                                >Login</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Button
                                    variant={'contained'}
                                    fullWidth onClick={handlerGoogleSingIn}
                                    disabled={isAuth}
                                >
                                    <Google/>
                                    <Typography sx={{ml:1}}>Google</Typography>
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
