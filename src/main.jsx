import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './style.css'
import JournalApp from "./JournalApp.jsx";
import {Provider} from "react-redux";
import {store} from "./store";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <JournalApp/>
                </DevSupport>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
