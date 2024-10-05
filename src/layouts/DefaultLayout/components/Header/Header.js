import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faCirclePlay,
    faCircleHalfStroke,
    faUser,
    faFlag,
    faCoins,
    faVideo,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import 'tippy.js/dist/tippy.css'
import TippyTooltip from '@tippyjs/react'
import { useContext } from 'react'
import ReactDOM from 'react-dom'

import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button'
import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import Search from '../Search'
import config from '~/config'
import Login from '~/layouts/Login'
import { useState } from 'react'
import { UserContext } from '~/hooks'

import MenuItems from './MenuItems'
import UserItems from './UserItems'

const cx = classNames.bind(styles)

function Header() {
    const { user, loggedInUserData } = useContext(UserContext)
    const currentUser = user.auth
    const [openModal, setOpenModal] = useState(false)

    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faCirclePlay} />,
            title: 'LIVE Creator Hub',
            to: '/live/creators',
        },
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
            children: {
                title: 'Keyboard',
                data: [
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleHalfStroke} />,
            title: 'Dark mode',
        },
    ]

    const USER_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: `/@${loggedInUserData.nickname}`,
        },
        {
            icon: <FontAwesomeIcon icon={faFlag} />,
            title: 'Favorites',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get Coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faVideo} />,
            title: 'LIVE Studio',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faTiktok} />,
            title: 'Get App',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
        },
    ]

    const handleMenuChange = (item) => {
        // console.log(item)
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    return (
        <header className={cx('header')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home}>
                    <img src={images.logo} alt="tiktok" />
                </Link>

                <Search />

                <div className={cx('action')}>
                    <Button text to={config.routes.upload}>
                        <FontAwesomeIcon icon={faPlus} />
                        Upload
                    </Button>
                    {user && currentUser ? (
                        <>
                            <TippyTooltip delay={[0, 300]} content="Messages">
                                <button className={cx('action-btn', 'btn-left')}>
                                    <img className={cx('action-btn-mes')} src={images.messages} alt="Messages" />
                                </button>
                            </TippyTooltip>

                            <TippyTooltip content="Inbox">
                                <button className={cx('action-btn')}>
                                    <img className={cx('action-btn-inbox')} src={images.inbox} alt="Inbox" />
                                </button>
                            </TippyTooltip>
                        </>
                    ) : (
                        <>
                            <Button primary onClick={handleOpenModal}>
                                Log in
                            </Button>
                            {openModal && ReactDOM.createPortal(<Login setOpenModal={setOpenModal} />, document.body)}
                        </>
                    )}

                    {user && currentUser ? (
                        <>
                            <UserItems
                                USER_ITEMS={USER_ITEMS}
                                user={user}
                                loggedInUserData={loggedInUserData}
                                currentUser={currentUser}
                                handleMenuChange={handleMenuChange}
                            />
                        </>
                    ) : (
                        <>
                            <MenuItems
                                MENU_ITEMS={MENU_ITEMS}
                                user={user}
                                loggedInUserData={loggedInUserData}
                                currentUser={currentUser}
                                handleMenuChange={handleMenuChange}
                            />
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
