import classNames from "classnames/bind"

import styles from './ToastMessage.module.scss'

const cx = classNames.bind(styles)

function ToastMessage({ message = 'Message Null' }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('notice-content')}>
                    <div className={cx('message')}>
                        {message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToastMessage;