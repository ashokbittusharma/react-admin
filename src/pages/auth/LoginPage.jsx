import { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";

export default function LoginPage() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const reponse = await api.post('/login_check', {
                email,
                password
            });
            await login(reponse.data.token);
            navigate('/');
        } catch (error) {
            alert('Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: "#f5f5f5"
        }}
        >
            <Card sx={{ width: 420 }} >
                <CardContent>
                    <Typography variant="h4" mb={3}>
                        Electro Admin
                    </Typography>

                    <form onSubmit={submit}>
                        <TextField label="Email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            } />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            } />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3 }} >
                            {loading ? "Logging In..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box >
    )
}