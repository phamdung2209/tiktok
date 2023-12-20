import classnames from 'classnames/bind'

import styles from './Home.module.scss'

const cx = classnames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <h1>Home</h1>
        </div>
    );
}

export default Home;