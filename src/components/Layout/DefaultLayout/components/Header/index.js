import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                {/* logo */}
                {/* search */}
            </div>
        </header>
    )
}

export default Header;