import { Box } from '@mui/material'
import React from 'react'
import {NavBar} from "../components";
import SideBar from "../components/SideBar.jsx";

export const JournalLayout = ({children}) => {
    const drawerWidth = 240;
  return (
   <Box sx={{display: "flex"}}>
    <NavBar  drawerWidth={drawerWidth}/>
    <SideBar drawerWidth={drawerWidth}/>
    <Box 
    component = "main" 
    sx={{flexGrow:1, p:3}}
    >
        {/* Toolbar */}
        {children}
    </Box>
   </Box>
  )
}
