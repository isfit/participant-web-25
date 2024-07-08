import { AuthTokens, AuthContextType, User } from '../types/types';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
        const token = localStorage.getItem('authTokens');
        return token ? JSON.parse(token) : null;
    });



    const [user, setUser] = useState<User | null>(() => {
        const token = localStorage.getItem('authTokens');
        return token ? jwtDecode(token as string) : null;
    })

    const login = async (email: string, password: string) => {
        let data = JSON.stringify({
            "email": email,
            "password": password
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                // Save token in HTTPonly cookie
                document.cookie = `token=${response.data.token}`;
                setAuthTokens(response.data.token);
                setUser(jwtDecode<User>(response.data.token));
                localStorage.setItem('authTokens', JSON.stringify(response.data.token));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };


    const refreshTokens = async () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'localhost:4000/auth/refresh',
            withCredentials: true,
        };
        return axios.request(config).then((response) => {
            const tokens = response.data
            setAuthTokens(tokens);
            localStorage.setItem('authTokens', JSON.stringify(tokens.token));
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (authTokens && authTokens.accessToken) {
            const decodedToken = jwtDecode<{ exp: number }>(authTokens.accessToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                refreshTokens();
            }
        }
    }, [authTokens]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (authTokens) {
                refreshTokens();
            }
        }, 15 * 60 * 1000); // Refresh every 15 minutes

        return () => clearInterval(interval);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={{ user, login, logout, authTokens }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
