import classNames from "classnames/bind"
import { useEffect, useRef, useState } from "react"

import styles from './LayoutVideo.module.scss'
import { Key } from '~/assets/icons'
import Contents from '../Contents'

const cx = classNames.bind(styles)

function LayoutVideo() {
    const videoRef = useRef()
    const likeRef = useRef()
    const [hoveredTab, setHoveredTab] = useState()
    const [tabClick, setTabClick] = useState(true)

    useEffect(() => {
        setHoveredTab(true)
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <div
                    ref={videoRef}
                    className={cx('nav-post', 'nav-item', tabClick === true ? 'active' : null)}
                    onClick={() => {
                        setTabClick(true)
                    }}
                    onMouseMove={() => {
                        setHoveredTab(true)
                    }}
                    onMouseLeave={() => {
                        if (tabClick === false) {
                            setHoveredTab(false)
                        } else {
                            setHoveredTab(true)
                        }
                    }}
                >
                    Videos
                </div>

                <div
                    ref={likeRef}
                    className={cx('nav-like', 'nav-item', tabClick === false ? 'active' : null)}
                    onClick={() => {
                        setTabClick(false)
                    }}
                    onMouseMove={() => {
                        setHoveredTab(false)
                    }}
                    onMouseLeave={() => {
                        if (tabClick === true) {
                            setHoveredTab(true)
                        } else {
                            setHoveredTab(false)
                        }
                    }}
                >
                    <Key />
                    Linked
                </div>

                <div
                    className={cx('nav-line')}
                    style={
                        hoveredTab
                            ? {
                                left: `${videoRef.current?.offsetLeft}px`,
                                width: `${videoRef.current?.offsetWidth}px`,
                            } : {
                                left: `${likeRef.current?.offsetLeft}px`,
                                width: `${likeRef.current?.offsetWidth}px`,
                            }
                    }
                >
                </div>
            </div>

            <div className={cx('content')}>
                <Contents tabClick={tabClick} />
            </div>
        </div >
    )
}

export default LayoutVideo
