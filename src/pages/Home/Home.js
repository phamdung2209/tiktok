import classnames from 'classnames/bind'
import { useEffect, useState, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'

import styles from './Home.module.scss'
import Image from '~/components/Image'
import VideoWrapper from './VideoWrapper'
import * as videoService from '~/services/videoService'

const cx = classnames.bind(styles)

function Home() {
    const [videoList, setVideoList] = useState([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    const elementRef = useRef(null)

    const location = useLocation()
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        document.title = 'TikTok - Make Your Day'
    }, [location.pathname])

    const onIntersect = entries => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore) {
            getMoreVideoForYou()
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect)

        if (observer && elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [videoList])

    async function getMoreVideoForYou() {
        try {
            const results = await videoService.getVideoForYou(page + 1, 'for-you')

            if (results.length === 0) {
                setHasMore(false)
            } else {
                setVideoList(prev => [...prev, ...results])
                setPage(page => page + 1)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {videoList && videoList.length > 0 && (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        {videoList.map((item, index) => (
                            <div key={item.id} className={cx('recommend-content')}>
                                <Link to={`/@${item.user.nickname}`} className={cx('avatar')}>
                                    <Image src={item.user.avatar} alt=' ' />
                                </Link>

                                <div className={cx('content-container')}>
                                    <VideoWrapper data={item} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {hasMore && (
                <div ref={elementRef} >
                    Loading...
                </div>
            )}
        </>
    )
}

export default Home