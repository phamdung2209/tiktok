import * as request from '~/utills/HttpRequest'

export const getSuggestedUsers = async ({ page = 1, perPage = 5 }) => {
    try {
        const res = await request.get('users/suggested', {
            params: {
                page,
                per_page: perPage
            }
        })

        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getFollowingUsers = async ({ page = 1 }) => {
    try {
        const res = await request.get('me/followings', {
            params: {
                page
            }
        })
        return res.data
    } catch (err) {
        console.log(err)
    }


}