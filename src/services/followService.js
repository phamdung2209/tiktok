import * as request from '~/utills/HttpRequest'

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