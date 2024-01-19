import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useLocation } from 'react-router-dom'

import styles from './ShareGroup.module.scss'
import Button from '~/components/Button'
import { Embed, FacebookIcon, WhatsApp, Twitter, CopyLink, ShareArrowIcon } from '~/assets/icons'
import ToastMessage from '~/components/ToastMessage'

const cx = classNames.bind(styles)
const SHARE_GROUP = [
    {
        title: 'Embed',
        icon: <Embed />,
        to: '/#'
    },
    {
        title: 'Share to Facebook',
        icon: <FacebookIcon />,
        to: '/#'
    },
    {
        title: 'Share to WhatsApp',
        icon: <WhatsApp />,
        to: '/#'
    },
    {
        title: 'Share to Twitter',
        icon: <Twitter />,
        to: '/#'
    },
    {
        title: 'Copy Link',
        icon: <CopyLink />,
    }
]

function ShareGroup({ data }) {
    const [actions, setActions] = useState({
        showToastCopyLink: false,
        isShowToast: false
    })

    const location = useLocation()

    return (
        <div className={cx('wrapper')}>
            {SHARE_GROUP.map((item, index) => (
                <Button
                    className={cx('share-group')}
                    key={index}
                    leftIcon={item.icon}
                    to={item.to}
                    onClick={() => {
                        if (item.title === 'Copy Link') {
                            if (actions.isShowToast) return

                            if (location.pathname.startsWith('/@')) {
                                navigator.clipboard.writeText(window.location.origin + location.pathname)
                            } else {
                                navigator.clipboard.writeText(window.location.origin + '/@' + data.user.nickname + '/video/' + data.uuid)
                            }

                            setActions(prev => ({
                                ...prev,
                                showToastCopyLink: true,
                                isShowToast: true
                            }))

                            setTimeout(() => {
                                setActions(prev => ({
                                    ...prev,
                                    showToastCopyLink: false,
                                    isShowToast: false
                                }))
                            }, 5000)
                        }
                    }}
                >
                    {item.title}
                </Button>
            ))}

            <div className={cx('share-arrow')}>
                <ShareArrowIcon />
            </div>

            {actions.showToastCopyLink && ReactDOM.createPortal(
                <ToastMessage message="Link copied to clipboard!" />,
                document.body
            )}
        </div>
    )
}

export default ShareGroup