import classNames from "classnames/bind"

import styles from './LoadingSuggestAccount.module.scss'

const cx = classNames.bind(styles)

function LoadingSuggestAccount() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}></div>
            <div className={cx('account-info')}>
                <div className={cx('nickname', 'animation')} />
                <div className={cx('name', 'animation')} />
            </div>
        </div>
    )
}

export default LoadingSuggestAccount;