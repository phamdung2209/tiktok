import { useState, useContext, memo, forwardRef, useImperativeHandle, useEffect } from 'react'
import classNames from 'classnames/bind'

import styles from './UserLogin.module.scss'
import {
    AppleIcon,
    ArrowRightIcon,
    FbIcon,
    GgIcon,
    KakaotalkIcon,
    LineIcon,
    QRIcon,
    TwitterIcon,
    UserIcon,
} from '~/assets/icons'
import * as loginService from '~/services/loginService'
import { UserContext } from '~/hooks'

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
                    name: 'username',
                },
                {
                    placeholder: 'Password',
                    type: 'password',
                    name: 'password',
                },
            ],
        },
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
    },
]

function UserLogin(_, ref) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [history, setHistory] = useState([{ data: MEDIA_LOGIN }])
    const [isParent, setIsParent] = useState(false)
    const [type, setType] = useState('Log in')

    useImperativeHandle(ref, () => ({
        setHistory,
        setIsParent,
        setType,
    }))

    const { login } = useContext(UserContext)
    const currentMenu = history[history.length - 1]

    const handleMenuClick = (item) => {
        const hasChildren = !!item.children
        if (item.children?.data) setIsParent(hasChildren)

        if (hasChildren) setHistory((prev) => [...prev, item.children])
    }

    const handleBackBtn = () => {
        setHistory((prev) => [prev[0]])
        setIsParent(false)
        setType('Log in')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        if (name === 'username') setUsername(value)
        else setPassword(value)
    }

    const handleSubmit = async () => {
        const results = await (type === 'Log in' ? loginService.login : loginService.signUp)(username, password)

        if (results) login(username, results.meta.token)
        else alert('Login failed')
    }

    const renderActions = currentMenu.data.map((item, index) => (
        <div key={index} className={cx('login-option')} onClick={() => handleMenuClick(item)}>
            {history.length > 1 ? (
                <div className={cx('form-submit')}>
                    <input
                        name={item.name}
                        autoComplete="off"
                        type={item.type}
                        placeholder={item.placeholder}
                        onChange={handleInputChange}
                    />
                </div>
            ) : (
                <>
                    <div className={cx('option-icon', 'option-hover')}>{item.icon}</div>
                    <div className={cx('option-title', 'option-hover')}>{item.title}</div>
                </>
            )}
        </div>
    ))

    return (
        <>
            {isParent && (
                <>
                    <div className={cx('back')} onClick={handleBackBtn}>
                        <ArrowRightIcon className={cx('back-icon')} />
                    </div>
                    <div className={cx('description')}>
                        Email or username
                        <div className={cx('login-other')}>Log in with phone</div>
                    </div>
                </>
            )}

            {renderActions}

            {isParent && (
                <>
                    <div className={cx('login-other')}>Forgot password?</div>

                    <button onClick={handleSubmit} className={cx('btn-submit')}>
                        {type}
                    </button>
                </>
            )}
        </>
    )
}

export default memo(forwardRef(UserLogin))
