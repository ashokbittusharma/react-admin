import { useEffect, useState } from "react";

import {
    Grid,
    Paper,
    Typography,
    CircularProgress,
} from "@mui/material";

import Inventory from "@mui/icons-material/Inventory";
import Category from "@mui/icons-material/Category";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import People from "@mui/icons-material/People";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";

import { getDashboard } from "../services/dashboardService";

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    const cards = [
        {
            title: "Products",
            value: dashboard.products,
            icon: <Inventory fontSize="large" />,
        },
        {
            title: "Categories",
            value: dashboard.categories,
            icon: <Category fontSize="large" />,
        },
        {
            title: "Orders",
            value: dashboard.orders,
            icon: <ShoppingCart fontSize="large" />,
        },
        {
            title: "Customers",
            value: dashboard.customers,
            icon: <People fontSize="large" />,
        },
        {
            title: "Revenue",
            value: `₹${dashboard.revenue}`,
            icon: <CurrencyRupee fontSize="large" />,
        },
    ];

    return (
        <>
            <Typography variant="h4" mb={3}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={2.4}
                        key={card.title}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <Typography color="text.secondary">
                                    {card.title}
                                </Typography>

                                <Typography variant="h4">
                                    {card.value}
                                </Typography>
                            </div>

                            {card.icon}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
