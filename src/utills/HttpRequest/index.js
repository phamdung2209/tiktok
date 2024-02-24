import axios from 'axios'

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const get = async (path, options = {}) => {
    const res = await request.get(path, options)
    return res.data
}

export const post = async (path, body, options = {}) => {
    const res = await request.post(path, body, options)
    return res.data
}

export const put = async (path, body, options = {}) => {
    const res = await request.put(path, body, options)
    return res.data
}

export const del = async (path, options = {}) => {
    const res = await request.delete(path, options)
    return res.data
}

export default request
