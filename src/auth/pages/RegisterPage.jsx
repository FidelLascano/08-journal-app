import React from 'react'
import AuthLayout from "../layout/AuthLayout.jsx";
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";

export const RegisterPage = () => {
  return (
      <AuthLayout title={"Register"}>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12}  spacing={1}>
              <TextField
                  label={'Full Name'}
                  type={'text'}
                  placeholder={'Jhon Smith'}
                  fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} spacing={1}>
              <TextField
                  label={'Email'}
                  type={'email'}
                  placeholder={'email@google.com'}
                  fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} >
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
                sx={{mb: 1, mt: 1 , pl:1}}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Button variant={'contained'} fullWidth>Create Account</Button>
              </Grid>
            </Grid>
            <Grid
                container
                direction={"row"}
                justifyContent={'end'}
            >
              <Link component={RouterLink} to={"/auth/login"} color={"inherit"}>Do you have an account? Login</Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
  )
}
