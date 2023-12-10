import classNames from 'classnames/bind'

import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <nav className={cx('navbar')}>
            <div>
                <li>
                    <Link to='/'>For You</Link>
                </li>
                <li>
                    <Link to='/following'>Following</Link>
                </li>
                <li>
                    <Link to='/explore'>Explore</Link>
                </li>
                <li>
                    <Link to='/live'>Live</Link>
                </li>
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
            </div>
        </nav>
    )
}

export default Sidebar;