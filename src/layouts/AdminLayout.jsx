import { useState } from "react";

import { Box, Toolbar } from "@mui/material";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const drawerWidth = 260;

export default function AdminLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Header handleDrawerToggle={
                handleDrawerToggle
            }
            />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={
                    handleDrawerToggle
                } />

            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 3, ml: {
                        md: `${drawerWidth}px`
                    }
                }}>
                <Toolbar />


                {children}
            </Box>
        </Box>
    );
}