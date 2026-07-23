import { useState } from "react";
import {
    Collapse,
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/"
    },
    {
        text: "Categories",
        icon: <CategoryIcon />,
        path: "/categories"
    },
    {
        text: "Brands",
        icon: <StoreIcon />,
        path: "/brands"
    }
];

export default function Sidebar({
    mobileOpen,
    handleDrawerToggle
}) {
    const location = useLocation();
    const [usersOpen, setUsersOpen] = useState(location.pathname.startsWith("/users"));

    const drawer = (
        <>
            <Toolbar>
                <h2>Electro</h2>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.path}
                        component={Link}
                        to={item.path}
                        selected={
                            location.pathname === item.path
                        }
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
                <ListItemButton onClick={() => setUsersOpen((open) => !open)} selected={location.pathname.startsWith("/users")}>
                    <ListItemIcon><PeopleIcon /></ListItemIcon><ListItemText primary="Users" />
                    {usersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={usersOpen} timeout="auto" unmountOnExit><List component="div" disablePadding>
                    {[["All Users", "/users"], ["Administrators", "/users/ROLE_ADMIN"], ["Managers", "/users/ROLE_MANAGER"], ["Customers", "/users/ROLE_CUSTOMER"]].map(([text, path]) => (
                        <ListItemButton key={path} component={Link} to={path} selected={location.pathname === path} sx={{ pl: 4 }}><ListItemText primary={text} /></ListItemButton>
                    ))}
                </List></Collapse>
            </List>
        </>
    )
    return (
        <>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {
                        xs: "block",
                        md: "none"
                    },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: {
                        xs: "none",
                        md: "block",
                    },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </>

    );
}
