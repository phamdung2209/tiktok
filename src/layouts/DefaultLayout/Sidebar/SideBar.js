import classNames from 'classnames/bind'

import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom';
import config from '~/config'

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <nav className={cx('navbar')}>
            <div>
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
            </div>
        </nav>
    )
}

export default Sidebar;