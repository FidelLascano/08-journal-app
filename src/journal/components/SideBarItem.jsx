import React, {useMemo} from "react";
import {Grid, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {setActiveNote} from "../../store/journal/";

export const SideBarItem = ({id, title, body, date, imageUrls=[]}) => {
    const dispatch = useDispatch();

    const {shortBody, shortTitle} = useMemo(() => ({
        shortBody: body?.length > 20 ? body.slice(0, 17) + '...' : body,
        shortTitle: title?.length > 20 ? title.slice(0, 17) + '...' : title,
    }), [title, body]);

    const handlerItemSelect = (event) => {
        event.preventDefault();
        dispatch(setActiveNote({id, title, body, date, imageUrls}));
    };


    return (
        <ListItem disablePadding onClick={handlerItemSelect}>
            <ListItemButton>
                <TurnedInNot/>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText primary={`${shortTitle}`} sx={{fontSize: 10}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText secondary={`${shortBody}`} sx={{fontSize: 10}}/>
                    </Grid>
                </Grid>
            </ListItemButton>
        </ListItem>
    );
}