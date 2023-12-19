import classNames from "classnames/bind"
import PropTypes from 'prop-types'
import { useEffect, useState, useContext } from "react"

import styles from './UserLogin.module.scss'
import { ArrowRightIcon } from '~/assets/icons'
import * as loginService from '~/services/loginService'
import { UserContext } from "~/hooks"


const cx = classNames.bind(styles)

function UserLogin({ mediaLogin = [] }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [history, setHistory] = useState([{ data: mediaLogin }])
    const [isParent, setIsParent] = useState(false)


    // login
    const { login } = useContext(UserContext);

    const currentMenu = history[history.length - 1]

    const handleMenuClick = (item) => {
        console.log(item)
        const hasChildren = !!item.children
        if (item.children?.data) {
            setIsParent(hasChildren)
        }

        if (hasChildren) {
            setHistory(prev => [...prev, item.children])
        }
    }

    const handleBackBtn = () => {
        setHistory(prev => prev.splice(prev.length - 1, 1))
        setIsParent(false)
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        if (name === 'username') {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

    const handleSubmit = () => {
        const fetchApi = async () => {
            const results = await loginService.login(username, password)

            if (results) {
                login(username, results.meta.token)
            } else {
                alert('Login failed')
            }
        }

        fetchApi()
    }

    const renderActions = () => {
        return (
            <>
                {currentMenu.data.map((item, index) => (
                    <div
                        key={index}
                        className={cx('login-option')}
                        onClick={() => handleMenuClick(item)}
                    >
                        {history.length > 1 ? (
                            <>
                                <div className={cx('form-submit')}>
                                    <input
                                        name={item.name}
                                        autoComplete="off"
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={cx('option-icon', 'option-hover')}>
                                    {item.icon}
                                </div>
                                <div className={cx('option-title', 'option-hover')}>
                                    {item.title}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            {isParent && <div className={cx('back')}
                onClick={handleBackBtn}
            >
                <ArrowRightIcon className={cx('back-icon')} />
            </div>}
            {
                isParent &&
                <div className={cx('description')}>
                    Email or username
                    <div className={cx('login-other')}>
                        Log in with phone
                    </div>
                </div>
            }
            {renderActions()}
            {
                isParent &&
                <>
                    <div className={cx('login-other')}>
                        Forgot password?
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={cx('btn-submit')}>
                        Log in
                    </button>
                </>
            }
        </>
    )
}

UserLogin.propTypes = {
    mediaLogin: PropTypes.array.isRequired,
}

export default UserLogin
