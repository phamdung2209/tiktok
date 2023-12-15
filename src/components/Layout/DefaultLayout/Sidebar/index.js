import classNames from 'classnames/bind'

import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom';
import routesConfig from '~/config/routes'

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <nav className={cx('navbar')}>
            <div>
                <li>
                    <Link to={routesConfig.home}>For You</Link>
                </li>
                <li>
                    <Link to={routesConfig.folowing}>Following</Link>
                </li>
                <li>
                    <Link to={routesConfig.explore}>Explore</Link>
                </li>
                <li>
                    <Link to={routesConfig.live}>Live</Link>
                </li>
                <li>
                    <Link to={routesConfig.profile}>Profile</Link>
                </li>
            </div>
        </nav>
    )
}

export default Sidebar;