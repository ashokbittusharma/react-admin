import { useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import ActionCell from "./ActionCell";
import DataTableToolbar from "./DataTableToolbar";

export default function DataTable({
    rows,
    columns,
    loading,
    onEdit,
    onDelete,
}) {
    const [search, setSearch] = useState("");

    const filteredRows = useMemo(() => {

        if (!search) return rows;

        return rows.filter((row) =>
            JSON.stringify(row)
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [rows, search]);

    const gridColumns = [
        ...columns,

        {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,

            renderCell: (params) => (
                <ActionCell
                    row={params.row}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <>
            <DataTableToolbar
                search={search}
                onSearch={setSearch}
            />

            <DataGrid
                autoHeight
                loading={loading}
                rows={filteredRows}
                columns={gridColumns}
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
            />
        </>
    );
}