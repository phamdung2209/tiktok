import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { animateScroll as scroll } from 'react-scroll'

import styles from './Footer.module.scss'
import config from '~/config'
import { EffectIcon } from '~/assets/icons'
import {
    GoToTop,
    DesktopIcon,
    PhoneIcon,
    CloseLargeIcon
} from '~/assets/icons'
import MenuItem from '~/components/Popper/Menu/MenuItem'

const cx = classNames.bind(styles)

function Footer() {
    const [isScrolling, setIsScrolling] = useState(false)
    const [isGoToTop, setIsGoToTop] = useState(false)
    const location = useLocation()
    const [actions, setActions] = useState({
        showGetApp: false,
    })

    const EXPAND_ITEMS = [
        {
            title: 'Get TikTok for desktop',
            icon: <DesktopIcon />
        },
        {
            title: 'Get TikTok App',
            icon: <PhoneIcon />,
            separate: true,
        }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(window.pageYOffset > 100)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (!location.pathname.includes('/video')) {
            setIsGoToTop(true)
        } else {
            setIsGoToTop(false)
        }
    }, [location])


    return (
        <>
            <footer className={cx('footer')}>
                <div className={cx('footer-banner')}>
                    <Link to={config.routes.home} className={cx('btn')}>
                        <EffectIcon className={cx('btn-icon')} />
                        <h4>Create effects</h4>
                    </Link>
                </div>

                <div className={cx('copy-right')}>
                    © 2023 TikTok
                </div>
            </footer>

            {isGoToTop && (
                <div className={`bottom-container ${isScrolling ? 'tran' : ''}`}>
                    <div className='get-app'>
                        <button
                            className='btn-get-app'

                            onClick={() => {
                                setActions({ showGetApp: !actions.showGetApp })
                            }}

                            style={{
                                transform: actions.showGetApp ? 'scale(0)' : 'none',
                                position: actions.showGetApp ? 'absolute' : 'relative',
                            }}
                        >Get App</button>

                        <div
                            className={cx('getApp-expand')}
                            style={{
                                position: actions.showGetApp ? 'relative' : 'absolute',
                                transform: actions.showGetApp ? 'none' : 'scale(0)',
                            }}
                        >
                            <div
                                className={cx('getApp-close')}
                                onClick={() => {
                                    setActions({ showGetApp: !actions.showGetApp })
                                }}
                            >
                                <CloseLargeIcon />
                            </div>

                            <div className={cx('getApp-expand-wrapper')}>
                                <div className={cx('expand-item')}>
                                    {EXPAND_ITEMS.map((item, index) => (
                                        <MenuItem key={index} data={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            scroll.scrollToTop({
                                duration: 500,
                                smooth: 'easeInOutQuart',
                                delay: 100,
                            })
                        }}
                        className={`go-to-top`}
                    >
                        <GoToTop />
                    </button>
                </div>
            )}
        </>
    )
}

export default Footer;