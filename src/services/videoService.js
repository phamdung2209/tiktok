import * as request from '~/utills/HttpRequest'

// apidomain//api/users/@huynhdinhchien96-1
// get user's videos
export const getUserVideos = async ({ username }) => {
    try {
        const res = await request.get(`users${username}`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}