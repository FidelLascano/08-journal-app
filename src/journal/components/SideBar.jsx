import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    Toolbar,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {SideBarItem} from "./";

const SideBar = ({drawerWidth = 240}) => {
    const {auth, journal} = useSelector(state => state);
    const {displayName} = auth;
    const {notes} = journal;


    return (
        <Box component={'nav'} sx={{sm: drawerWidth, flexShrink: {sm: 0}}}>
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: {xs: "block"},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}>
                <Toolbar>
                    <Typography variant={'h6'} noWrap component="div">{`${displayName}`}</Typography>
                </Toolbar>
                <Divider/>
                <List>
                    {notes?.map(note => (<SideBarItem key={note.id} {...note}/>))}
                </List>
            </Drawer>
        </Box>
    );
};

export default SideBar;