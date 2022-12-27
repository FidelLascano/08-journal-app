import React from 'react';
import {Box, Drawer, Toolbar, Typography} from "@mui/material";

const SideBar = ({drawerWidth = 240}) => {
    return (
        <Box component={'nav'} sx = {{sm: drawerWidth, flexShrink: {sm: 0}}}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display:{xs: "block"},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}
            >
                <Toolbar>
                    <Typography variant={'h6'} noWrap component="div">Fidel Lascano</Typography>
                </Toolbar>
            </Drawer>
        </Box>
    );
};

export default SideBar;