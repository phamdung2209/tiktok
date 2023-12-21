import classNames from "classnames/bind"

import styles from './ShareGroup.module.scss'
import Button from "~/components/Button"
import { Embed, FacebookIcon, WhatsApp, Twitter, CopyLink, ShareArrowIcon } from '~/assets/icons'

const cx = classNames.bind(styles)
const SHARE_GROUP = [
    {
        title: 'Embed',
        icon: <Embed />,
        to: '/share/profile'
    },
    {
        title: 'Share to Facebook',
        icon: <FacebookIcon />,
        to: '/share/profile'
    },
    {
        title: 'Share to WhatsApp',
        icon: <WhatsApp />,
        to: '/share/profile'
    },
    {
        title: 'Share to Twitter',
        icon: <Twitter />,
        to: '/share/profile'
    },
    {
        title: 'Copy Link',
        icon: <CopyLink />,
        to: '/share/profile'
    }
]

function ShareGroup() {
    return (
        <div className={cx('wrapper')}>
            {SHARE_GROUP.map((item, index) => (
                <Button className={cx('share-group')} key={index} leftIcon={item.icon} to={item.to}>
                    {item.title}
                </Button>
            ))}

            <div className={cx('share-arrow')}>
                <ShareArrowIcon />
            </div>
        </div>
    )
}

export default ShareGroup