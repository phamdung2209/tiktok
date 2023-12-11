import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react/headless'
import Pop from '@tippyjs/react'

import styles from './Header.module.scss'
import images from '~/assets/images'
import { Wrapper as WapperPopper } from '~/components/Popper'
import AccountItem from '~/components/AccountItems'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Header() {
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setSearchResults([1, 2, 3])
        }, 0)
    })

    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <Link to='/'>
                    <img src={images.logo} alt='tiktok' />
                </Link>

                <Tippy
                    interactive={true}
                    visible={searchResults.length > 0}
                    render={attrs => (
                        <div className={cx('search-results')} tabIndex='-1' {...attrs}>
                            <WapperPopper>
                                <div>
                                    abc
                                </div>
                                <label className={cx('search-label')}>Accounts</label>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </WapperPopper>
                        </div>
                    )}
                >
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
                </Tippy>

                <div className={cx('action')}>
                    <Button  text to='/upload'>
                        <FontAwesomeIcon icon={faPlus} />
                        Upload
                    </Button>
                    <Button primary to='/login'>Log in</Button>
                </div>
            </div>
        </header>
    )
}

export default Header;