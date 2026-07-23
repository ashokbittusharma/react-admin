import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import useAuth from "../../../features/auth/context/useAuth";

export default function Header({
    handleDrawerToggle,
}) {
    const { logout, user } = useAuth();

    return (
        <AppBar position="fixed" sx={{ width: { md: `calc(100% - 260px)` }, ml: { md: "260px" }, }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        mr: 2,
                        display: {
                            md: "none"
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6" sx={{ flexGrow: 1 }}>
                    Electro Admin
                </Typography>

                <Typography sx={{ mr: 2 }}>
                    {user?.email}
                </Typography>

                <Button
                    color="inherit"
                    onClick={logout}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}
