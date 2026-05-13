import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('crypto-dash-user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (username, password) => {
        // Mock authentication
        if (username === 'admin' && password === 'password') {
            const userData = { username, role: 'admin' };
            setUser(userData);
            sessionStorage.setItem('crypto-dash-user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('crypto-dash-user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
