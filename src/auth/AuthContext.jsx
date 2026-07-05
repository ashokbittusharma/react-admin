import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

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
        setToken(jwt);

        await fetchProfile();
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
    }, []);

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

export function useAuth() {
    return useContext(AuthContext);
}