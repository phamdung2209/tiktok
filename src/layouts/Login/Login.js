import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { memo, useRef, useTransition } from 'react'

import styles from './Login.module.scss'
import config from '~/config'
import { CloseIcon, Loading } from '~/assets/icons'
import UserLogin from './UserLogin'

const cx = classNames.bind(styles)

const DATA_SIGN_UP = {
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
}

function Login({ setOpenModal, ...props }) {
    const userLoginRef = useRef(null)
    const [isPending, startTransition] = useTransition()

    return (
        <div className={cx('wrapper', props.className)}>
            <div className={cx('overlay')}>
                <div className={cx('container')}>
                    <div className={cx('login-container')}>
                        <h2 className={cx('title')}>Log in to TikTok</h2>

                        <div className={cx('login-options')}>
                            <UserLogin ref={userLoginRef} />
                        </div>
                    </div>

                    <div className={cx('agreement-container')}>
                        <p>
                            By continuing with an account located in
                            <Link className={cx('agreement-text')} to={config.routes.home}>
                                {' '}
                                Vietnam
                            </Link>
                            , you agree to our
                            <Link className={cx('agreement-text')} to={config.routes.home}>
                                {' '}
                                Terms of Service{' '}
                            </Link>
                            and acknowledge that you have read our
                            <Link className={cx('agreement-text')} to={config.routes.home}>
                                {' '}
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>

                    <div className={cx('signUp-container')}>
                        <span className={cx('button-text')}>Don’t have an account?</span>
                        <Link
                            to={'#'}
                            className={cx('button-link')}
                            onClick={() => {
                                startTransition(() => {
                                    userLoginRef.current?.setIsParent(true)
                                    userLoginRef.current?.setHistory((prev) => [...prev, DATA_SIGN_UP])
                                    userLoginRef.current?.setType('Sign up')
                                })
                            }}
                        >
                            {isPending ? <Loading /> : 'Sign up'}
                        </Link>
                    </div>
                </div>

                <div onClick={() => setOpenModal(false)} className={cx('close')}>
                    <CloseIcon />
                </div>
            </div>
        </div>
    )
}

export default memo(Login)
