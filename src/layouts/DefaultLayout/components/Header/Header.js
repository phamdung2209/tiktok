import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEarthAsia, faCircleQuestion, faKeyboard, faCirclePlay, faCircleHalfStroke, faUser, faFlag, faCoins, faVideo, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons'
import 'tippy.js/dist/tippy.css'
import TippyTooltip from '@tippyjs/react'
import { useContext, useEffect } from 'react'

import styles from './Header.module.scss'
import images from '~/assets/images'
import Button from '~/components/Button'
// import { Menu as MenuPopper } from '~/components/Popper'
import { faTiktok } from '@fortawesome/free-brands-svg-icons'
// import { MoreIcon } from '~/assets/icons'
// import Image from '~/components/Image'
import Search from '../Search'
import config from '~/config'
import Login from '~/layouts/Login'
import { useState } from 'react'
import { UserContext } from '~/hooks'

import MenuItems from './MenuItems'
import UserItems from './UserItems'

const cx = classNames.bind(styles)

function Header() {
    const { user, dataUser } = useContext(UserContext)
    const currentUser = user.auth
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        console.log('User context has changed:', user);
    }, [user]);

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
                        title: 'English'
                    },
                    {
                        code: 'vi',
                        title: 'Tiếng Việt'
                    },
                ]
            }
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
                        title: 'English'
                    },
                    {
                        code: 'vi',
                        title: 'Tiếng Việt'
                    }
                ]
            }
        },
        {
            icon: <FontAwesomeIcon icon={faCircleHalfStroke} />,
            title: 'Dark mode',
        }
    ]

    const USER_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: `/@${dataUser.nickname}`,
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
                    <img src={images.logo} alt='tiktok' />
                </Link>

                {/* Search */}
                <Search />

                <div className={cx('action')}>
                    <Button text to={config.routes.upload}>
                        <FontAwesomeIcon icon={faPlus} />
                        Upload
                    </Button>
                    {user && currentUser ? (
                        <>
                            <TippyTooltip delay={[0, 300]} content='Messages'>
                                <button className={cx('action-btn', 'btn-left')}>
                                    <img className={cx('action-btn-mes')} src={images.messages} alt='Messages' />
                                </button>
                            </TippyTooltip>

                            <TippyTooltip content='Inbox'>
                                <button className={cx('action-btn')}>
                                    <img className={cx('action-btn-inbox')} src={images.inbox} alt='Inbox' />
                                </button>
                            </TippyTooltip>
                        </>
                    ) : (
                        <>
                            <Button primary onClick={handleOpenModal}>Log in</Button>
                            {openModal && <Login setOpenModal={setOpenModal} />}
                        </>
                    )}

                    {/* more */}
                    {/* <MenuPopper menuItems={user && currentUser ? USER_ITEMS : MENU_ITEMS} currentUser={currentUser} onChange={handleMenuChange}>
                        {user && currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src={dataUser.avatar ?? images.noBg}
                                alt=''
                            // fallBack='https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/271605415_1614588432227494_1107124473320678271_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=11e7ab&_nc_eui2=AeFdkF5uqgTP9D2hHn2D87EU_KdI4N38JtD8p0jg3fwm0Oy5LQMKdxg3pLPekX_9MhkAbjLPOQDNDgyIH6EPbuxm&_nc_ohc=eR8gD2V7Cl0AX_wL49A&_nc_ht=scontent.fhan14-2.fna&oh=00_AfBgKYQFkZ3yj4qrreSPvT4grLqPWCpIpmc4_ubXPsvmRQ&oe=65813C8D'
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <MoreIcon />
                            </button>
                        )}
                    </MenuPopper> */}

                    {user && currentUser ? (
                        <>
                            <UserItems USER_ITEMS={USER_ITEMS} user={user} dataUser={dataUser} currentUser={currentUser} handleMenuChange={handleMenuChange} />
                        </>
                    ) : (
                        <>
                            <MenuItems MENU_ITEMS={MENU_ITEMS} user={user} dataUser={dataUser} currentUser={currentUser} handleMenuChange={handleMenuChange} />
                        </>
                    )}
                </div>
            </div>
        </header >
    )


}

export default Header;