import {CircularProgress, Grid, Typography} from "@mui/material";
import React from "react";
import {useCheckAuth} from "../../hooks/useCheckAuth.js";

export const CheckingAuth = () => {

    return (
        <Grid
            container
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 0}}
        >
            <CircularProgress color="warning"/>
        </Grid>
    );
};
