import React, {useEffect, useMemo, useRef} from 'react';
import Swal from 'sweetalert2';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {SaveOutlined, UploadOutlined} from "@mui/icons-material";
import ImageGallery from "./ImageGallery.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../hooks/index.js";
import {updateNoteFilesT, updateNoteT} from "../../store/journal/index.js";
import {uploadImages} from "../../helper/cloudinary.js";

const NoteView = () => {

    const {active:note, isSaving, messageSave,savingNewNote} = useSelector(state => state.journal);
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
    const fileInputRef = useRef();

    const handlerUpdate = (event) => {
        event.preventDefault();
        dispatch(updateNoteT({id, title, body, date: (new Date()).getTime() , imageUrls}));
    }

    function handlerFileChange(event)
    {

        const files = event.target.files;
        if(files.length === 0) return;
        const FileList = Object.values(files);
        dispatch(updateNoteFilesT(FileList));
    }



    function handlerFileClick() { fileInputRef.current.click();}

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
                <input type={"file"} multiple={true} onChange={handlerFileChange} hidden={true} ref={fileInputRef}/>
                <Button color={"primary"} onClick={handlerFileClick} disabled={isSaving}>
                    <UploadOutlined />
                </Button>

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
        <ImageGallery images={note.imageUrls}/>
        </Grid>
    );
};

export default NoteView;