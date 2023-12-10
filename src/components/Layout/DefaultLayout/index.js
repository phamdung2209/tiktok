import classNames from 'classnames/bind'

import Header from "../DefaultLayout/components/Header";
import Sidebar from "./Sidebar";
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>
                    <div className={cx('content-inner')}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DefaultLayout;