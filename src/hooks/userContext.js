import { createContext, useEffect, useState } from 'react'

import * as loginService from '~/services/loginService'


const accessToken = localStorage.getItem('accessToken')
// const 

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [dataUser, setDataUser] = useState({})
    useEffect(() => {
        if (accessToken) {
            const fetchApi = async () => {
                const results = await loginService.getUserData(accessToken)
                
                if (results) {
                    login(results.email, accessToken)
                    setDataUser(results)
                } else {
                    logout(accessToken)
                }
            }
            fetchApi()
        }
    }, [])
    // const [user, setUser] = useState({ email: '', auth: false });
    const [user, setUser] = useState(localStorage.getItem('accessToken') ? { email: '', auth: true, dataUser } : { email: '', auth: false, dataUser });

    // Login updates the user data with a name parameter
    const login = (email, accessToken) => {
        localStorage.setItem('accessToken', accessToken)
        setUser((user) => ({
            email: email,
            auth: true,
        }));
    };

    // Logout updates the user data to default
    const logout = () => {
        localStorage.removeItem('accessToken')
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}