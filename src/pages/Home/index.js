import classnames from 'classnames/bind'
import { useEffect } from "react"
import { useLocation } from "react-router-dom";

import styles from './Home.module.scss'

const cx = classnames.bind(styles)

function Home() {
    const location = useLocation()
    
    useEffect(() => {
        document.title = 'TikTok - Make Your Day'
    }, [location.pathname])

    return (
        <div className={cx('wrapper')}>
            <h1>Home</h1>
        </div>
    );
}

export default Home;