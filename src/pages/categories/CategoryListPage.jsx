import { useState } from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
} from "@mui/material";

import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader/PageHeader";

import useCrud from "../../hooks/useCrud";

import categoryService from "../../services/categoryService";

const emptyCategory = {
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true,
    sortOrder: "0",
};

export default function CategoryListPage() {
    const {
        rows,
        loading,
        refresh,
    } = useCrud(categoryService);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingCategory, setDeletingCategory] = useState(null);
    const [creatingCategory, setCreatingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState(emptyCategory);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const closeDialogs = () => {
        if (saving) return;
        setEditingCategory(null);
        setDeletingCategory(null);
        setCreatingCategory(false);
        setNewCategory(emptyCategory);
        setError(null);
    };

    const categoryPayload = (category) => {
        const payload = {
            name: category.name.trim(),
            slug: category.slug.trim(),
            isActive: category.isActive,
            sortOrder: Number(category.sortOrder) || 0,
        };

        const description = category.description?.trim();
        const image = category.image?.trim();
        if (description) payload.description = description;
        if (image) payload.image = image;

        return payload;
    };

    const handleCreate = async () => {
        const payload = categoryPayload(newCategory);

        if (!payload.name || !payload.slug) {
            setError("Name and slug are required.");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            await categoryService.create(payload);
            setCreatingCategory(false);
            setNewCategory(emptyCategory);
            await refresh();
        } catch {
            setError("Unable to create this category. Please check the values and try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = async () => {
        const name = editingCategory.name.trim();

        if (!name) {
            setError("A category name is required.");
            return;
        }

        const payload = {
            name,
            sortOrder: Number(editingCategory.sortOrder) || 0,
        };

        const slug = editingCategory.slug.trim();
        if (slug) {
            payload.slug = slug;
        }

        setSaving(true);
        setError(null);

        try {
            await categoryService.update(editingCategory.id, payload);
            setEditingCategory(null);
            await refresh();
        } catch {
            setError("Unable to update this category. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setSaving(true);
        setError(null);

        try {
            await categoryService.delete(deletingCategory.id);
            setDeletingCategory(null);
            await refresh();
        } catch {
            setError("Unable to delete this category. It may be in use.");
        } finally {
            setSaving(false);
        }
    };

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
                onAdd={() => {
                    setError(null);
                    setCreatingCategory(true);
                }}
            />

            <DataTable
                rows={rows}
                columns={columns}
                loading={loading}
                onEdit={(row) => setEditingCategory({
                    ...row,
                    name: row.name ?? "",
                    slug: row.slug ?? "",
                    sortOrder: String(row.sortOrder ?? 0),
                })}
                onDelete={setDeletingCategory}
            />

            <Dialog open={creatingCategory} onClose={closeDialogs} fullWidth maxWidth="sm">
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            autoFocus
                            label="Name"
                            required
                            value={newCategory.name}
                            onChange={(event) => setNewCategory((category) => ({
                                ...category,
                                name: event.target.value,
                            }))}
                        />
                        <TextField
                            label="Slug"
                            required
                            helperText="Use lowercase words separated by hyphens."
                            value={newCategory.slug}
                            onChange={(event) => setNewCategory((category) => ({
                                ...category,
                                slug: event.target.value,
                            }))}
                        />
                        <TextField
                            label="Description"
                            multiline
                            minRows={3}
                            value={newCategory.description}
                            onChange={(event) => setNewCategory((category) => ({
                                ...category,
                                description: event.target.value,
                            }))}
                        />
                        <TextField
                            label="Image URL"
                            value={newCategory.image}
                            onChange={(event) => setNewCategory((category) => ({
                                ...category,
                                image: event.target.value,
                            }))}
                        />
                        <TextField
                            label="Sort order"
                            type="number"
                            value={newCategory.sortOrder}
                            onChange={(event) => setNewCategory((category) => ({
                                ...category,
                                sortOrder: event.target.value,
                            }))}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={newCategory.isActive}
                                    onChange={(event) => setNewCategory((category) => ({
                                        ...category,
                                        isActive: event.target.checked,
                                    }))}
                                />
                            }
                            label="Active"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogs} disabled={saving}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={saving} variant="contained">
                        {saving ? "Creating..." : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(editingCategory)} onClose={closeDialogs} fullWidth maxWidth="sm">
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            autoFocus
                            label="Name"
                            required
                            value={editingCategory?.name ?? ""}
                            onChange={(event) => setEditingCategory((category) => ({
                                ...category,
                                name: event.target.value,
                            }))}
                        />
                        <TextField
                            label="Slug"
                            value={editingCategory?.slug ?? ""}
                            onChange={(event) => setEditingCategory((category) => ({
                                ...category,
                                slug: event.target.value,
                            }))}
                        />
                        <TextField
                            label="Sort order"
                            type="number"
                            value={editingCategory?.sortOrder ?? "0"}
                            onChange={(event) => setEditingCategory((category) => ({
                                ...category,
                                sortOrder: event.target.value,
                            }))}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogs} disabled={saving}>Cancel</Button>
                    <Button onClick={handleEdit} disabled={saving} variant="contained">
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(deletingCategory)} onClose={closeDialogs} fullWidth maxWidth="xs">
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <span>
                            Delete “{deletingCategory?.name}”? This action cannot be undone.
                        </span>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogs} disabled={saving}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" disabled={saving} variant="contained">
                        {saving ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
