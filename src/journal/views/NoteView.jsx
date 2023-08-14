import React, {useEffect, useMemo} from 'react';
import Swal from 'sweetalert2';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {SaveOutlined} from "@mui/icons-material";
import ImageGallery from "./ImageGallery.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../hooks/index.js";
import {updateNoteT} from "../../store/journal/index.js";

const NoteView = () => {
    const {active:note, isSaving, messageSave} = useSelector(state => state.journal);
    const {id, title, body, date, imageUrls, onInputChange, onResetForm} = useForm(note);
    const formattedDate = useMemo(() => ((new Date(date)).toLocaleString("en-CA", {
        hour12: false,
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        second: "2-digit"
    })), [date]);

    useEffect(() => {
        if(messageSave && messageSave.length> 0) Swal.fire("Saved", messageSave, "success");
    }, [messageSave]);

    const dispatch = useDispatch();

    const handlerUpdate = (event) => {
        event.preventDefault();
        dispatch(updateNoteT({id, title, body, date: (new Date()).getTime() , imageUrls}));
    }

    return (
        <Grid container
              direction={'row'}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{mb:1}}

        >
            <Grid item>
                <Typography fontSize={25} fontWeight={'light'}>{formattedDate}</Typography>
            </Grid>
            <Grid item>
                <Button color={"primary"} sx={{padding:2}} onClick={handlerUpdate} disabled={isSaving}>
                    <SaveOutlined sx={{fontSize: 25, mr: 1}}/>
                    Save
                </Button>
            </Grid>
            <Grid container>

                <TextField
                    size={"small"}
                type={"text"}
                variant={"filled"}
                fullWidth
                placeholder={"Insert a title"}
                    value={title}
                    onChange={onInputChange}
                label={"title"}
                name={"title"}
                sx={{border:"none", mb: 1, background: "primary.main"}}
                />

                <TextField
                    type={"text"}
                    variant={"filled"}
                    fullWidth
                    multiline={true}
                    placeholder={"What happened today?"}
                    value={body}
                    onChange={onInputChange}
                    name={"body"}
                    minRows={5}
                />

            </Grid>
        <ImageGallery/>
        </Grid>
    );
};

export default NoteView;