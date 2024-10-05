import * as request from '~/utills/HttpRequest'

export const login = async (email, password) => {
    try {
        const body = {
            email,
            password,
        }
        const res = await request.post('auth/login', body)
        return res
    } catch (err) {
        console.log(err)
    }
}

export const signUp = async (email, password) => {
    try {
        const body = {
            email,
            password,
            type: 'email',
        }
        const res = await request.post('auth/register', body)
        return res
    } catch (err) {
        console.log(err)
    }
}

export const getUserData = async (accessToken) => {
    try {
        const res = await request.get('auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return res.data
    } catch (err) {
        console.log('Error fetching user data:', err)
        throw err
    }
}
