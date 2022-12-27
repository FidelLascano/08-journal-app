import React from 'react'
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom"
import {Google} from "@mui/icons-material";
import AuthLayout from "../layout/AuthLayout.jsx";

export const LoginPage = () => {
    return (
        <AuthLayout title={"Login"}>
                <form>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12} spacing={1}>
                            <TextField
                                label={'Email'}
                                type={'email'}
                                placeholder={'email@gmail.com'}
                                fullWidth
                            ></TextField>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                label={'Password'}
                                type={'password'}
                                placeholder={'password'}
                                fullWidth
                            />
                        </Grid>
                        <Grid
                            container
                            spacing={1}
                            sx={{mb: 1, mt: 1}}
                        >
                            <Grid item xs={12} sm={6} >
                                <Button variant={'contained'} fullWidth>Login</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Button variant={'contained'} fullWidth>
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
