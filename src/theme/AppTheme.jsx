import React from 'react';
import {ThemeProvider} from "@mui/material/styles"
import {purpleTheme} from "./purpleTheme.js";
import CssBaseline from "@mui/material/CssBaseline";

const AppTheme = ({children}) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;
