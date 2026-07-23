import { useEffect, useState } from "react";
import api from "../../../api/axios";
import AuthContext from "./authContext";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/profile");
            setUser(response.data);

        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    }

    const login = async (jwt) => {
        localStorage.setItem('token', jwt);
        setLoading(true);
        setToken(jwt);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setLoading(false);

        window.location.href = "/login";
    };

    useEffect(() => {
        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [token]);

    return <AuthContext.Provider
        value={{
            token,
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!token,
        }}
    >
        {children}
    </AuthContext.Provider>
}
