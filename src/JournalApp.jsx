import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import AppTheme from "./theme/AppTheme.jsx";

const JournalApp = (props) => {
    return (
        <AppTheme>
            <AppRouter/>
        </AppTheme>
    );
}

export default JournalApp;