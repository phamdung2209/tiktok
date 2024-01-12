import classNames from 'classnames/bind'

import styles from './LoadingWrapper.module.scss'
import { Loading } from '~/assets/icons'

const cx = classNames.bind(styles)

function LoadingWrapper() {
    return (
        <div className={cx('wrapper')}>
            <Loading />
        </div>
    )
}

export default LoadingWrapper;