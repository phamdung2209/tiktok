import classNames from 'classnames/bind'

import styles from './Sidebar.module.scss'
import config from '~/config'
import Menu, { MenuItem } from './Menu/';
import { HomeIcon, UserGrIcon, ExploreIcon, LiveIcon, HomeActiveIcon, UserGrActiveIcon, ExploreActiveIcon, LiveActiveIcon } from '~/assets/icons'

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <aside className={cx('navbar')}>
            {/* <div>
                <li>
                    <Link to={config.routes.home}>For You</Link>
                </li>
                <li>
                    <Link to={config.routes.folowing}>Following</Link>
                </li>
                <li>
                    <Link to={config.routes.explore}>Explore</Link>
                </li>
                <li>
                    <Link to={config.routes.live}>Live</Link>
                </li>
                <li>
                    <Link to={config.routes.profile}>Profile</Link>
                </li>
            </div> */}
            <Menu>
                <MenuItem activeIcon={<HomeActiveIcon />} icon={<HomeIcon />} title='For You' to={config.routes.home} />
                <MenuItem activeIcon={<UserGrActiveIcon />} icon={<UserGrIcon />} title='Following' to={config.routes.folowing} />
                <MenuItem activeIcon={<ExploreActiveIcon />} icon={<ExploreIcon />} title='Explore' to={config.routes.explore} />
                <MenuItem activeIcon={<LiveActiveIcon />} icon={<LiveIcon />} title='LIVE' to={config.routes.live} />
                {/* <MenuItem icon={<P/>} title='Profile' to={config.routes.profile} /> */}
            </Menu>

        </aside>
    )
}

export default Sidebar;