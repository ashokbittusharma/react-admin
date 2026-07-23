import { useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import useCrud from "../../hooks/useCrud";
import userService from "../../services/userService";

const roles = ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_CUSTOMER"];
const roleLabels = { ROLE_ADMIN: "Administrators", ROLE_MANAGER: "Managers", ROLE_CUSTOMER: "Customers" };
const emptyUser = (role = "ROLE_CUSTOMER") => ({ email: "", password: "", firstName: "", lastName: "", phone: "", roles: [role] });

export default function UserListPage() {
    const { role } = useParams();
    const { rows, loading, refresh } = useCrud(userService);
    const [user, setUser] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const selectedRole = roles.includes(role) ? role : null;
    const visibleUsers = selectedRole ? rows.filter((item) => item.roles?.includes(selectedRole)) : rows;

    const closeDialogs = () => {
        if (saving) return;
        setUser(null); setEditingId(null); setDeletingUser(null); setError(null);
    };
    const payloadFor = (values, isEditing) => {
        const password = values.password.trim();
        if (!isEditing && !password) return null;
        const payload = { email: values.email.trim(), firstName: values.firstName.trim(), lastName: values.lastName.trim(), roles: values.roles };
        if (password) payload.password = password;
        if (values.phone.trim()) payload.phone = values.phone.trim();
        return payload;
    };
    const saveUser = async () => {
        const payload = payloadFor(user, editingId !== null);
        if (!payload?.email || !payload.firstName || !payload.lastName || payload.roles.length === 0) {
            setError("Email, password, first name, last name, and at least one role are required."); return;
        }
        setSaving(true); setError(null);
        try {
            if (editingId === null) await userService.create(payload); else await userService.update(editingId, payload);
            setUser(null); setEditingId(null); await refresh();
        } catch { setError("Unable to save this user. Please check the values and try again."); }
        finally { setSaving(false); }
    };
    const deleteUser = async () => {
        setSaving(true); setError(null);
        try { await userService.delete(deletingUser.id); setDeletingUser(null); await refresh(); }
        catch { setError("Unable to delete this user. The user may be referenced by other records."); }
        finally { setSaving(false); }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 80 }, { field: "email", headerName: "Email", flex: 1.3 },
        { field: "firstName", headerName: "First name", flex: 1 }, { field: "lastName", headerName: "Last name", flex: 1 },
        { field: "roles", headerName: "Roles", flex: 1.2, valueGetter: (_, row) => row.roles?.map((item) => item.replace("ROLE_", "")).join(", ") ?? "-" },
    ];
    return <>
        <PageHeader title={selectedRole ? roleLabels[selectedRole] : "Users"} buttonText="Add User" onAdd={() => { setError(null); setEditingId(null); setUser(emptyUser(selectedRole ?? "ROLE_CUSTOMER")); }} />
        <DataTable rows={visibleUsers} columns={columns} loading={loading}
            onEdit={(row) => { setError(null); setEditingId(row.id); setUser({ email: row.email ?? "", password: "", firstName: row.firstName ?? "", lastName: row.lastName ?? "", phone: row.phone ?? "", roles: row.roles?.filter((item) => roles.includes(item)) ?? [] }); }}
            onDelete={setDeletingUser} />
        <Dialog open={Boolean(user)} onClose={closeDialogs} fullWidth maxWidth="sm">
            <DialogTitle>{editingId === null ? "Add User" : "Edit User"}</DialogTitle>
            <DialogContent><Stack spacing={2} sx={{ pt: 1 }}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField autoFocus label="Email" type="email" required value={user?.email ?? ""} onChange={(event) => setUser((values) => ({ ...values, email: event.target.value }))} />
                <TextField label={editingId === null ? "Password" : "New password (optional)"} type="password" required={editingId === null} value={user?.password ?? ""} onChange={(event) => setUser((values) => ({ ...values, password: event.target.value }))} />
                <TextField label="First name" required value={user?.firstName ?? ""} onChange={(event) => setUser((values) => ({ ...values, firstName: event.target.value }))} />
                <TextField label="Last name" required value={user?.lastName ?? ""} onChange={(event) => setUser((values) => ({ ...values, lastName: event.target.value }))} />
                <TextField label="Phone" value={user?.phone ?? ""} onChange={(event) => setUser((values) => ({ ...values, phone: event.target.value }))} />
                <FormControl required><InputLabel id="user-roles-label">Roles</InputLabel><Select labelId="user-roles-label" label="Roles" multiple value={user?.roles ?? []} onChange={(event) => setUser((values) => ({ ...values, roles: event.target.value }))}>
                    {roles.map((item) => <MenuItem key={item} value={item}>{item.replace("ROLE_", "")}</MenuItem>)}
                </Select></FormControl>
            </Stack></DialogContent>
            <DialogActions><Button onClick={closeDialogs} disabled={saving}>Cancel</Button><Button onClick={saveUser} disabled={saving} variant="contained">{saving ? "Saving..." : "Save"}</Button></DialogActions>
        </Dialog>
        <Dialog open={Boolean(deletingUser)} onClose={closeDialogs} fullWidth maxWidth="xs">
            <DialogTitle>Delete User</DialogTitle><DialogContent><Stack spacing={2}>{error && <Alert severity="error">{error}</Alert>}<span>Delete “{deletingUser?.email}”? This action cannot be undone.</span></Stack></DialogContent>
            <DialogActions><Button onClick={closeDialogs} disabled={saving}>Cancel</Button><Button onClick={deleteUser} color="error" disabled={saving} variant="contained">{saving ? "Deleting..." : "Delete"}</Button></DialogActions>
        </Dialog>
    </>;
}
