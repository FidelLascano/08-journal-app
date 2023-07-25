import React from 'react'
import AuthLayout from "../layout/AuthLayout.jsx";
import {Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import {useForm} from "../../hooks/index.js";
import {useDispatch} from "react-redux";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const {email, password, fullName, onInputChange, formState, onResetForm} = useForm({
    email: 'fidekof@gmail.com',
    password: '123456',
    fullName: 'Fidel Lascano'
  });

  const handlerCreateSubmit = (event) =>
  {
    event.preventDefault();
    console.log(formState);
    //dispatch()
  }

  return (
      <AuthLayout title={"Register"}>
        <form onSubmit={handlerCreateSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}  spacing={1}>
              <TextField
                  name={'fullName'}
                  label={'Full Name'}
                  type={'text'}
                  placeholder={fullName}
                  onChange={onInputChange}
                  fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} spacing={1}>
              <TextField
                  name={'email'}
                  label={'Email'}
                  type={'email'}
                  placeholder={email}
                  onChange={onInputChange}
                  fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} >
              <TextField
                  name={'password'}
                  label={'Password'}
                  type={'password'}
                  placeholder={password}
                  fullWidth
                  onChange={onInputChange}
              />
            </Grid>
            <Grid
                container
                spacing={1}
                sx={{mb: 1, mt: 1 , pl:1}}
            >
              <Grid item xs={12} sm={12} md={12}>
                <Button
                    variant={'contained'}
                    fullWidth
                    type={'submit'}
                >Create Account</Button>
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
