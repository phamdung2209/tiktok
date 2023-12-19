import classNames from "classnames/bind"
import { Link } from "react-router-dom"

import styles from './Login.module.scss'
import config from "~/config"
import {
    CloseIcon,
    QRIcon,
    UserIcon,
    FbIcon,
    GgIcon,
    TwitterIcon,
    LineIcon,
    KakaotalkIcon,
    AppleIcon
} from '~/assets/icons'
import UserLogin from './UserLogin'

const cx = classNames.bind(styles)

const MEDIA_LOGIN = [
    {
        icon: <QRIcon />,
        title: 'Use QR code',
    },
    {
        icon: <UserIcon />,
        title: 'Use phone / email / username',
        children: {
            title: 'Email or username',
            data: [
                {
                    placeholder: 'Email or username',
                    type: 'text',
                    name: 'username'
                },
                {
                    placeholder: 'Password',
                    type: 'password',
                    name: 'password'
                }
            ]
        }
    },
    {
        icon: <FbIcon />,
        title: 'Continue with Facebook',
    },
    {
        icon: <GgIcon />,
        title: 'Continue with Google',
    },
    {
        icon: <TwitterIcon />,
        title: 'Continue with Twitter',
    },
    {
        icon: <LineIcon />,
        title: 'Continue with LINE',
    },
    {
        icon: <KakaotalkIcon />,
        title: 'Continue with KakaoTalk',
    },
    {
        icon: <AppleIcon />,
        title: 'Continue with Apple',
    }
]

function Login({ setOpenModal }) {
    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}>
                <div className={cx('container')}>
                    <div className={cx('login-container')}>
                        <h2 className={cx('title')}>
                            Log in to TikTok
                        </h2>

                        <div className={cx('login-options')}>
                            <UserLogin mediaLogin={MEDIA_LOGIN} />

                            {/* {MEDIA_LOGIN.map((item, index) => (
                                <div key={index} className={cx('login-option')}>
                                    <div className={cx('option-icon')}>
                                        {item.icon}
                                    </div>
                                    <div className={cx('option-title')}>
                                        {item.title}
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>

                    <div className={cx('agreement-container')}>
                        <p>
                            By continuing with an account located in
                            <Link className={cx('agreement-text')} to={config.routes.home}> Vietnam</Link>,
                            you agree to our
                            <Link className={cx('agreement-text')} to={config.routes.home}> Terms of Service </Link>
                            and acknowledge that you have read our
                            <Link className={cx('agreement-text')} to={config.routes.home}> Privacy Policy</Link>.
                        </p>
                    </div>

                    <div className={cx('signUp-container')}>
                        <div className={cx('button-text')}>
                            Don’t have an account?
                        </div>
                        <Link to={config.routes.signup} className={cx('button-link')}>
                            Sign up
                        </Link>
                    </div>
                </div>

                <div onClick={handleClose} className={cx('close')}>
                    <CloseIcon />
                </div>
            </div>
        </div>
    )
}

export default (Login);