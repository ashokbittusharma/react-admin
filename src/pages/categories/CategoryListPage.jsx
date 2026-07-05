import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader/PageHeader";

import useCrud from "../../hooks/useCrud";

import categoryService from "../../services/categoryService";

export default function CategoryListPage() {

    const {
        rows,
        loading,
    } = useCrud(categoryService);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "parent",
            headerName: "Parent",
            flex: 1,
            valueGetter: (_, row) =>
                row.parent?.name ?? "-",
        },
        {
            field: "slug",
            headerName: "Slug",
            flex: 1,
        },
        {
            field: "sortOrder",
            headerName: "Sort",
            width: 100,
        },
    ];

    return (
        <>
            <PageHeader
                title="Categories"
                buttonText="Add Category"
            />

            <DataTable
                rows={rows}
                columns={columns}
                loading={loading}
                onEdit={(row) =>
                    console.log("Edit", row)
                }
                onDelete={(row) =>
                    console.log("Delete", row)
                }
            />
        </>
    );
}