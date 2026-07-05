import {
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
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";

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
        text: "Brand",
        icon: <StoreIcon />,
        path: "/brands"
    },
    {
        text: "Products",
        icon: <InventoryIcon />,
        path: "/products"
    },
    {
        text: "Orders",
        icon: <ShoppingCartIcon />,
        path: "/orders"
    }
];

export default function Sidebar({
    mobileOpen,
    handleDrawerToggle
}) {
    const location = useLocation();

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