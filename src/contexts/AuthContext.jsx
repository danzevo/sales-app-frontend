import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Loader from '../components/Shared/Loader';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = useCallback(async() => {
        try {
            const response = await axiosInstance.get('/auth/me');
            setUser(response.data);
            return response.data; // Return user data for caller
        } catch(error) {
            console.error('Error fetching user:', error);
            setUser(null);
            throw error; // Propagate the error to handle it in the caller
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback((message) => {
        setUser(null);
        setLoading(false);
        localStorage.removeItem('token');
        if(message) {
            localStorage.setItem('authMessage', message);
        }
        navigate('/login');
    }, [navigate]);

    const isTokenExpired = useCallback((token) => {
        try {
            const {exp} = jwtDecode(token);
            return Date.now() >= exp * 1000;
        } catch(err) {
            console.error('Error decoding token: ', err);
            return true;
        }
    },[]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isRegisterPage = window.location.pathname === '/register';

        if(isRegisterPage) {
            setLoading(false);
            return;
        }

        if (token) {
            try {
                const parts = token.split('.');
                if(parts.length === 3) {
                    if(isTokenExpired(token)) {
                        console.warn('Token expired, redirecting to login');
                        logout('Your session has expired. Please log in again');
                    } else {
                        fetchUser();
                    }
                } else {
                    throw new Error('Invalid token format.');
                }
            } catch(err) {
                console.error('Error decoding token : ', err);
                logout('Invalid token. Please log in again');
            }
        } else {
            console.warn('No token found, redirecting to login');
            logout();
        }
       
    }, [fetchUser, logout, isTokenExpired]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
        
        navigate('/');
    }

    if(loading) {
        return <Loader/>
    }
    /* const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    } */

    return (
        <AuthContext.Provider value={{user, login, logout, fetchUser}}>
            {children}
        </AuthContext.Provider>
    )
}