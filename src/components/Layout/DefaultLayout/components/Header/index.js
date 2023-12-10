import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function Header() {
    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <Link to='/'>
                    <img src={images.logo} alt='tiktok' />
                </Link>

                <div className={cx('search')}>
                    <input type='text' placeholder='Search' spellCheck={false} />
                    <button className={cx('close')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                <div className={cx('action')}>

                </div>
            </div>
        </header>
    )
}

export default Header;