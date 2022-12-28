import React from 'react'
import {JournalLayout} from "../layout/JournalLayout";
import NoteView from "../views/NoteView.jsx";

/*<NothingSelectedView/>*/
export const JournalPage = () => {
    return (
        <JournalLayout>
            <NoteView/>
        </JournalLayout>
    )
}
