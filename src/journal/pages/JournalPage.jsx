import React, {useMemo} from 'react'
import {JournalLayout} from "../layout/JournalLayout";
import NoteView from "../views/NoteView.jsx";
import {IconButton} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import {saveEmptyNoteT} from "../../store/journal/index.js";
import {useDispatch, useSelector} from "react-redux";
import NothingSelectedView from "../views/NothingSelectedView.jsx";

/*<NothingSelectedView/>*/
const initialNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
};
export const JournalPage = () => {
    const {isSaving, active} = useSelector(state => state.journal);
    const dispatch = useDispatch();
    const isSavingNote = useMemo(() => isSaving === true, [isSaving]);

    const handlerAddClick = () => {
        dispatch(saveEmptyNoteT(initialNote));
    }
    return (
        <JournalLayout>
            {!!active?<NoteView/>:<NothingSelectedView/>}
            <IconButton
                size={'large'}
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover':{ backgroundColor: 'error.main', opacity: 0.9},
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                }}
                onClick={handlerAddClick}
                disabled={isSavingNote}
            ><AddOutlined sx={{fontSize:30}}/></IconButton>
        </JournalLayout>
    )
}
