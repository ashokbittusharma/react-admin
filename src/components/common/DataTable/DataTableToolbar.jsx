import {
    Box,
    TextField,
    InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function DataTableToolbar({
    search,
    onSearch,
}) {
    return (
        <Box mb={2}>
            <TextField
                size="small"
                fullWidth
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                    onSearch(e.target.value)
                }
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}