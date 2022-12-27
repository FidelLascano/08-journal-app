import React from 'react';
import {Grid, Typography} from "@mui/material";

const AuthLayout = ({children, title}) => {
    return (
        <Grid
            container
            spacing={0}
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
        >
            <Grid item
                  className={'box-shadow'}
                  xs={3}
                  sx={{
                      backgroundColor: 'rgba(250, 250, 250, 0.85)',
                      padding: 3,
                      borderRadius: 2,
                      width: {md:"450px", sm:"450px"}
            }}>
                <Typography variant={'h5'} sx={{mb: 1}}>{title}</Typography>
                {children}
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
