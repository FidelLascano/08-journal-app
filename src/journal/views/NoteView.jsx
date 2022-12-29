import React from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {SaveOutlined} from "@mui/icons-material";
import ImageGallery from "./ImageGallery.jsx";

const NoteView = () => {
    return (
        <Grid container
              direction={'row'}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{mb:1}}

        >
            <Grid item>
                <Typography fontSize={25} fontWeight={'light'}>28 August, 2022</Typography>
            </Grid>
            <Grid item>
                <Button color={"primary"} sx={{padding:2}}>
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
                label={"title"}
                sx={{border:"none", mb: 1, background: "primary.main"}}

                />
                <TextField
                    type={"text"}
                    variant={"filled"}
                    fullWidth
                    multiline={true}
                    placeholder={"What happened today?"}
                    minRows={5}
                />
            </Grid>
        <ImageGallery/>
        </Grid>
    );
};

export default NoteView;