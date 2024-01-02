import * as request from '~/utills/HttpRequest'

const accessToken = localStorage.getItem('accessToken')

export const getFollowingLists = async (page = 1, accessToken) => {
    try {
        const res = await request.get('me/followings', {
            params: {
                page
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return res
    } catch (err) {
        console.log(err)
    }
}

export const followUser = async ({ idUser }) => {
    try {
        const res = await request.post(`users/${idUser}/follow`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const unfollowUser = async ({ idUser }) => {
    try {
        const res = await request.post(`users/${idUser}/unfollow`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}