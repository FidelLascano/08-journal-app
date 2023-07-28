import React, {useMemo, useState} from 'react'
import AuthLayout from "../layout/AuthLayout.jsx";
import {Alert, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Google} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import {useForm} from "../../hooks/index.js";
import {useDispatch, useSelector} from "react-redux";
import {formValidations} from "../../utils/index.js";
import {startSignInWithEmailAndPassword} from "../../store/auth/thunks.js";

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const dispatch = useDispatch();
  const {status, errorMessage} = useSelector(state => state.auth);
  const isUserAuth = useMemo(() => status === 'checking', [status]);


  const {
    email, password, fullName, onInputChange, formState,
    emailValid, passwordValid, fullNameValid, onResetForm
  } = useForm({
    email: 'fidekof@gmail.com',
    password: '123456',
    fullName: 'Fidel Lascano',
    emailValid: {isValid: true, message: ''},
    passwordValid: {isValid: true, message: ''},
    fullNameValid: {isValid: true, message: ''},
  }, formValidations);


  const formValid = useMemo(() => (emailValid.isValid && passwordValid.isValid && fullNameValid.isValid)  , [emailValid, passwordValid, fullNameValid]);

  const handlerCreateSubmit = (event) =>
  {
    event.preventDefault();
    if(!formValid)
    {
      setFormSubmitted(false);
      return;
    }

    setFormSubmitted(true);
    dispatch(startSignInWithEmailAndPassword(email, password, fullName));
    console.log(formState);
  }

  return (
      <AuthLayout title={"Register"}>
        <form onSubmit={handlerCreateSubmit}>
          {(!formSubmitted) &&  <h2 style={{color: `${formValid?'green':'red'}`}}>{formValid?'Valid Form':'Invalid Form'}</h2>}
          <Grid container spacing={1}>
            <Grid item xs={12}  spacing={1}>
              <TextField
                  name={'fullName'}
                  label={'Full Name'}
                  type={'text'}
                  onChange={onInputChange}
                  fullWidth
                  value={fullName}
                  error={!fullNameValid.isValid && !formSubmitted}
                  helperText={(!fullNameValid.isValid && !formSubmitted)?fullNameValid.message:''}
              ></TextField>
            </Grid>
            <Grid item xs={12} spacing={1}>
              <TextField
                  name={'email'}
                  label={'Email'}
                  type={'email'}
                  onChange={onInputChange}
                  fullWidth
                  value={email}
                  error={!emailValid.isValid && !formSubmitted}
                  helperText={(!emailValid.isValid && !formSubmitted)? emailValid.message : ''}
              ></TextField>
            </Grid>
            <Grid item xs={12} >
              <TextField
                  name={'password'}
                  label={'Password'}
                  type={'password'}
                  value={password}
                  fullWidth
                  onChange={onInputChange}
                  error={!passwordValid.isValid && !formSubmitted}
                  helperText={(!passwordValid.isValid && !formSubmitted) ? passwordValid.message : ''}
              />
            </Grid>
            <Grid
                container
                spacing={1}
                sx={{mb: 1, mt: 1 , pl:1}}
            >
              <Grid item xs={12} sm={12} md={12} display={(!!errorMessage)?'':'none'}>
                <Alert severity={(!!errorMessage?'error':'success')}>{(!!errorMessage)?errorMessage:'User Logged'}</Alert>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Button
                    variant={'contained'}
                    fullWidth
                    type={'submit'}
                    disabled={isUserAuth}
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
