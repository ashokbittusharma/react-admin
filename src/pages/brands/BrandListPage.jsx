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
import brandService from "../../services/brandService";

const emptyBrand = {
    name: "",
    slug: "",
    description: "",
    logo: "",
    isActive: true,
};

export default function BrandListPage() {
    const { rows, loading, refresh } = useCrud(brandService);
    const [brand, setBrand] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [deletingBrand, setDeletingBrand] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const closeDialogs = () => {
        if (saving) return;
        setBrand(null);
        setEditingId(null);
        setDeletingBrand(null);
        setError(null);
    };

    const toPayload = (values) => {
        const payload = {
            name: values.name.trim(),
            slug: values.slug.trim(),
            isActive: values.isActive,
        };
        const description = values.description.trim();
        const logo = values.logo.trim();
        if (description) payload.description = description;
        if (logo) payload.logo = logo;
        return payload;
    };

    const saveBrand = async () => {
        const payload = toPayload(brand);
        if (!payload.name || !payload.slug) {
            setError("Name and slug are required.");
            return;
        }

        setSaving(true);
        setError(null);
        try {
            if (editingId === null) {
                await brandService.create(payload);
            } else {
                await brandService.update(editingId, payload);
            }
            setBrand(null);
            setEditingId(null);
            await refresh();
        } catch {
            setError("Unable to save this brand. Please check the values and try again.");
        } finally {
            setSaving(false);
        }
    };

    const deleteBrand = async () => {
        setSaving(true);
        setError(null);
        try {
            await brandService.delete(deletingBrand.id);
            setDeletingBrand(null);
            await refresh();
        } catch {
            setError("Unable to delete this brand. It may be in use.");
        } finally {
            setSaving(false);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "slug", headerName: "Slug", flex: 1 },
        { field: "description", headerName: "Description", flex: 1.5 },
        { field: "isActive", headerName: "Active", type: "boolean", width: 100 },
    ];

    return (
        <>
            <PageHeader
                title="Brands"
                buttonText="Add Brand"
                onAdd={() => {
                    setError(null);
                    setEditingId(null);
                    setBrand(emptyBrand);
                }}
            />

            <DataTable
                rows={rows}
                columns={columns}
                loading={loading}
                onEdit={(row) => {
                    setError(null);
                    setEditingId(row.id);
                    setBrand({
                        name: row.name ?? "",
                        slug: row.slug ?? "",
                        description: row.description ?? "",
                        logo: row.logo ?? "",
                        isActive: row.isActive ?? true,
                    });
                }}
                onDelete={setDeletingBrand}
            />

            <Dialog open={Boolean(brand)} onClose={closeDialogs} fullWidth maxWidth="sm">
                <DialogTitle>{editingId === null ? "Add Brand" : "Edit Brand"}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField autoFocus label="Name" required value={brand?.name ?? ""}
                            onChange={(event) => setBrand((values) => ({ ...values, name: event.target.value }))} />
                        <TextField label="Slug" required helperText="Use lowercase words separated by hyphens."
                            value={brand?.slug ?? ""}
                            onChange={(event) => setBrand((values) => ({ ...values, slug: event.target.value }))} />
                        <TextField label="Description" multiline minRows={3} value={brand?.description ?? ""}
                            onChange={(event) => setBrand((values) => ({ ...values, description: event.target.value }))} />
                        <TextField label="Logo URL" value={brand?.logo ?? ""}
                            onChange={(event) => setBrand((values) => ({ ...values, logo: event.target.value }))} />
                        <FormControlLabel
                            control={<Switch checked={brand?.isActive ?? true}
                                onChange={(event) => setBrand((values) => ({ ...values, isActive: event.target.checked }))} />}
                            label="Active"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogs} disabled={saving}>Cancel</Button>
                    <Button onClick={saveBrand} disabled={saving} variant="contained">
                        {saving ? "Saving..." : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(deletingBrand)} onClose={closeDialogs} fullWidth maxWidth="xs">
                <DialogTitle>Delete Brand</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <span>Delete “{deletingBrand?.name}”? This action cannot be undone.</span>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogs} disabled={saving}>Cancel</Button>
                    <Button onClick={deleteBrand} color="error" disabled={saving} variant="contained">
                        {saving ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
