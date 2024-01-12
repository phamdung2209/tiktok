import * as request from '~/utills/HttpRequest'

const accessToken = localStorage.getItem('accessToken')

export const getUserVideos = async ({ username }) => {
    try {
        const res = await request.get(`users${username}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getVideo = async ({ uuid }) => {
    try {
        const res = await request.get(`videos/${uuid}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getVideoComments = async ({ uuid }, page) => {
    try {
        const res = await request.get(`videos/${uuid}/comments`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

            params: {
                page
            }
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const postComment = async (uuid, comment) => {
    const body = {
        uuid,
        comment
    }
    try {
        const res = await request.post(`videos/${uuid}/comments`, body, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const deletePostComment = async (idComment) => {
    try {
        const res = await request.del(`comments/${idComment}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return res.data
    } catch (err) {
        console.log(err)
    }

}

export const actionLikeVideos = async ({ uuid }) => {
    try {
        const res = await request.post(`videos/${uuid}/like`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const actionUnLikeVideos = async ({ uuid }) => {
    try {
        const res = await request.post(`videos/${uuid}/unlike`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const actionLikeComments = async ({ idComment }) => {
    try {
        const res = await request.post(`comments/${idComment}/like`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const actionUnLikeComments = async ({ idComment }) => {
    try {
        const res = await request.post(`comments/${idComment}/unlike`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getVideoForYou = async (page, type) => {
    try {
        const res = await request.get(`videos`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

            params: {
                type: type,
                page
            }
        })

        return res
    } catch (err) {
        console.log(err)
    }
}