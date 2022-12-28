import {Box, Toolbar} from '@mui/material'
import React from 'react'
import {NavBar} from "../components";
import SideBar from "../components/SideBar.jsx";

export const JournalLayout = ({children}) => {
    const drawerWidth = 280;
    return (
        <Box display={"flex"} justifyContent={"space-around"}>
            <NavBar drawerWidth={drawerWidth}/>
            <SideBar drawerWidth={drawerWidth}/>
            <Box
                component="main"
                sx={{p: 3}}
                position={"absolute"}
                right={0}
                width={`calc(100% - ${drawerWidth}px)`}
            >
                <Toolbar/>
                {children}
            </Box>
        </Box>
    )
}
