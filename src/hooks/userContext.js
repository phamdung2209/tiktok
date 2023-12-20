// import { createContext, useEffect, useLayoutEffect, useState } from 'react'

// import * as loginService from '~/services/loginService'

// const accessToken = localStorage.getItem('accessToken')
// export const UserContext = createContext()

// export const UserProvider = ({ children }) => {
//     const [dataUser, setDataUser] = useState({})

//     useEffect(() => {
//         if (accessToken) {
//             const fetchApi = async () => {
//                 const results = await loginService.getUserData(accessToken)

//                 if (results) {
//                     setDataUser(results)
//                     login(results.email, accessToken)
//                 } else {
//                     logout()
//                 }
//             }
//             fetchApi()
//         }
//     }, [])

//     const [user, setUser] = useState(localStorage.getItem('accessToken') ? { email: '', auth: true } : { email: '', auth: false })

//     const login = async (email, accessToken) => {
//         localStorage.setItem('accessToken', accessToken)
//         try {
//             const results = await loginService.getUserData(accessToken)
//             if (results) {
//                 setDataUser(results)
//                 setUser({
//                     email: email,
//                     auth: true,
//                 })
//             } else {
//                 logout()
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error)
//         }
//     }

//     const logout = () => {
//         localStorage.removeItem('accessToken');
//         setDataUser({});
//         setUser({
//             email: '',
//             auth: false,
//         });
//     }

//     return (
//         <UserContext.Provider value={{ user, login, logout, dataUser }}>
//             {children}
//         </UserContext.Provider>
//     )
// }

import { createContext, useEffect, useState } from 'react';
import * as loginService from '~/services/loginService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [dataUser, setDataUser] = useState({});
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
                        setDataUser(results);
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
                setDataUser(results);
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
        setDataUser({});
        setUser({
            email: '',
            auth: false,
        });
    };

    if (!isApiCallComplete) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user, login, logout, dataUser }}>
            {children}
        </UserContext.Provider>
    );
};
