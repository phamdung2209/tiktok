import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import HeaderOnly from '~/components/Layout/HeaderOnly'
import Search from '~/pages/Search'
import Live from '~/pages/Live'
import Explore from '~/pages/Explore'

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    { path: '/live', component: Live, },
    { path: '/explore', component: Explore, },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }