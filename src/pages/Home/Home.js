import classnames from 'classnames/bind'
import { useEffect, useState, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import Tippy from '@tippyjs/react/headless'

import styles from './Home.module.scss'
import Image from '~/components/Image'
import VideoWrapper from './VideoWrapper'
import * as videoService from '~/services/videoService'
import { Wrapper } from '~/components/Popper'
import AccountPreview from '~/components/SuggestAccounts/AccountPreview'
import LoadingWrapper from '~/components/LoadingWrapper'

const cx = classnames.bind(styles)

function Home() {
    const [videoList, setVideoList] = useState([])
    const [renderedPages, setRenderedPages] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [totalPages, setTotalPages] = useState(40)
    const [actions, setActions] = useState({
        isHoverUser: false,
    })

    const loadingRef = useRef(null)

    const location = useLocation()

    useEffect(() => {
        const getTotalPages = async () => {
            const results = await videoService.getVideoForYou(1, 'for-you')
            setTotalPages(results.meta.pagination.total_pages)
        }

        getTotalPages()
    }, [])

    useEffect(() => {
        document.title = 'TikTok - Make Your Day'
    }, [location.pathname])

    const onIntersect = (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore) {
            getMoreVideoForYou()
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect)

        if (observer && loadingRef.current) {
            observer.observe(loadingRef.current)
        }

        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoList])

    async function getMoreVideoForYou() {
        if (renderedPages.length === totalPages) {
            setHasMore(false)
            return
        }

        try {
            const randomPage = Math.floor(Math.random() * totalPages) + 1

            if (renderedPages.includes(randomPage)) {
                getMoreVideoForYou()
                return
            }

            const results = await videoService.getVideoForYou(randomPage, 'for-you')

            if (results.data.length === 0) {
                setHasMore(false)
            } else {
                setVideoList((prev) => [...prev, ...results.data])
                setRenderedPages((prev) => [...prev, randomPage])
            }

            if (renderedPages.length < 1) {
                scroll.scrollToTop()
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
                        {videoList.map((item) => (
                            <div key={item.id} className={cx('recommend-content')}>
                                <Tippy
                                    appendTo={() => document.body}
                                    interactive={true}
                                    delay={[800, 0]}
                                    // visible={actions.isHoverUser}
                                    offset={[120, 0]}
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <Wrapper>
                                                <AccountPreview data={item.user} />
                                            </Wrapper>
                                        </div>
                                    )}
                                >
                                    <Link
                                        to={`/@${item.user.nickname}`}
                                        className={cx('avatar')}
                                        onMouseEnter={() => setActions({ ...actions, isHoverUser: true })}
                                        onMouseLeave={() => setActions({ ...actions, isHoverUser: false })}
                                    >
                                        <Image src={item.user.avatar} alt=" " />
                                    </Link>
                                </Tippy>

                                <div className={cx('content-container')}>
                                    <VideoWrapper actions={actions} setActions={setActions} data={item} key={item.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {hasMore && (
                <div ref={loadingRef}>
                    <LoadingWrapper />
                </div>
            )}
        </>
    )
}

export default Home
