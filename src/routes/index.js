import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import HeaderOnly from '~/components/Layout/HeaderOnly'
import Search from '~/pages/Search'
import Live from '~/pages/Live'
import Explore from '~/pages/Explore'
import routesConfig from '~/config/routes'

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.folowing, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
    { path: routesConfig.live, component: Live, },
    { path: routesConfig.explore, component: Explore, },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }