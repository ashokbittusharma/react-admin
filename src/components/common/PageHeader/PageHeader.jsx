import { Box, Typography, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function PageHeader({
    title, buttonText, onAdd,
}) {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
        >
            <Typography variant="h4">
                {title}
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
            >
                {buttonText}
            </Button>
        </Box>
    )
}