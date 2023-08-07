import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";
import {useSelector} from "react-redux";

const SideBar = ({drawerWidth = 240}) => {
    const {displayName} = useSelector(state => state.auth);

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
                    <Typography variant={'h6'} noWrap component="div">{displayName}</Typography>
                </Toolbar>
                <Divider/>
                <List>
                    {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map(
                        text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <TurnedInNot/>
                                <Grid container>
                                    <ListItemText primary={text} sx={{fontSize:10}}/>
                                    <ListItemText secondary={"Here, you can wirte a content text"} sx={{fontSize:10}}/>
                                </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    );
};

export default SideBar;