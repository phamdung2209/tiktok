import { createContext, useEffect, useState } from 'react';
import * as loginService from '~/services/loginService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedInUserData, setLoggedInUserData] = useState({});
    const [isApiCallComplete, setIsApiCallComplete] = useState(false);
    const [user, setUser] = useState({
        email: '',
        auth: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    const results = await loginService.getUserData(accessToken);
                    if (results && results.email) {
                        setLoggedInUserData(results);
                        setUser({
                            email: results.email,
                            auth: true,
                        });
                    } else {
                        logout();
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsApiCallComplete(true);
            }
        };

        fetchData();
    }, []);

    const login = async (email, accessToken) => {
        localStorage.setItem('accessToken', accessToken);
        try {
            const results = await loginService.getUserData(accessToken);
            if (results && results.email) {
                setLoggedInUserData(results);
                setUser({
                    email: results.email,
                    auth: true,
                });
            } else {
                logout();
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setLoggedInUserData({});
        setUser({
            email: '',
            auth: false,
        });
    };

    if (!isApiCallComplete) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user, login, logout, loggedInUserData }}>
            {children}
        </UserContext.Provider>
    );
};
