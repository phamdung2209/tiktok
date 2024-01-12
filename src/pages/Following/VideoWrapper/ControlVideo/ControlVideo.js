import classNames from 'classnames/bind'
import ReactPlayer from 'react-player'
import React, { useState, useRef, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useInView } from 'react-intersection-observer'

import styles from './ControlVideo.module.scss'
import Button from '~/components/Button'
import {
    LikeLargeIcon,
    CommentLargeIcon,
    FlagLargeIcon,
    ShareLargeIcon,
    LikedLargeIcon,
    MoreSolidIcon,
    PlayMdIcon,
    MutedMdIcon,
    PauseMdIcon,
    UnMutedMdIcon,
    NotInterestIcon,
} from '~/assets/icons'
import ConvertData from '~/components/ConvertData'
import * as videoService from '~/services/videoService'
import { Wrapper as WapperPopper } from '~/components/Popper'
import ShareGroup from '~/pages/Profile/ShareGroup'
import MenuItem from '~/components/Popper/Menu/MenuItem'
import { FormattedTime } from '~/components/ConvertData/ConvertData'

const cx = classNames.bind(styles)

function ControlVideo({ data }) {
    const [videoControls, setVideoControls] = useState(() => {
        return {
            isPlaying: false,
            isMuted: false,
            duration: 0,
            progress: 0,
            volume: JSON.parse(localStorage.getItem('volume') ?? 0.5),
            isShowAction: false,
            isDraggingVolume: false,
            isHoverVolume: false,
        }
    })
    const [dataVideo, setDataVideo] = useState(data)

    const videoPlayerRef = useRef()
    const progressVolumeRef = useRef()
    const progressRef = useRef()
    const navigator = useNavigate()

    useEffect(() => {
        setVideoControls(prev => ({
            ...prev,
            volume: JSON.parse(localStorage.getItem('volume') ?? 0.5)
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.parse(localStorage.getItem('volume') ?? 0.5)])

    useEffect(() => {
        setDataVideo(data)
    }, [data])

    const { ref: elementRef, inView } = useInView({
        threshold: 0,
        rootMargin: '0px 0px -100px 0px',
    })

    useEffect(() => {
        setVideoControls(prev => ({
            ...prev,
            isPlaying: inView
        }))

        const handleChangView = () => {
            if (document.visibilityState === 'hidden') {
                setVideoControls(prev => ({
                    ...prev,
                    isPlaying: false
                }))
            } else {
                setVideoControls(prev => ({
                    ...prev,
                    isPlaying: inView
                }))
            }
        }

        window.addEventListener('visibilitychange', handleChangView)

        return () => {
            window.removeEventListener('visibilitychange', handleChangView)
        }
    }, [inView])

    const handleActionClick = type => {
        switch (type) {
            case 'like':
                if (dataVideo.is_liked) {
                    const unFollowUser = async () => {
                        const results = await videoService.actionUnLikeVideos({ uuid: dataVideo.uuid })

                        if (results) {
                            setDataVideo(prev => ({
                                ...prev,
                                is_liked: false,
                                likes_count: prev.likes_count - 1
                            }))
                        }
                    }

                    unFollowUser()
                } else {
                    const followUser = async () => {
                        const results = await videoService.actionLikeVideos({ uuid: dataVideo.uuid })

                        if (results) {
                            setDataVideo(prev => ({
                                ...prev,
                                is_liked: true,
                                likes_count: prev.likes_count + 1
                            }))
                        }
                    }

                    followUser()
                }
                break
            case 'comment':
                handleChangLinkVideo()
                break
            case 'flag':
                console.log('flag')
                break
            default:
                break
        }
    }

    const handleChangLinkVideo = () => navigator(`/@${dataVideo.user.nickname}/video/${dataVideo.uuid}`)

    const handleClickVolume = e => {
        const rect = e.currentTarget.getBoundingClientRect()
        const offsetY = e.clientY - rect.top
        const height = rect.height

        const normalizedClickedHeight = Math.min(height, Math.max(0, offsetY))

        setVideoControls(prev => ({
            ...prev,
            volume: (height - normalizedClickedHeight) / height
        }))

        localStorage.setItem('volume', JSON.stringify((height - normalizedClickedHeight) / height))
    }

    const handleDragVolume = () => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = e => {
        const rect = progressVolumeRef.current.getBoundingClientRect()
        const offsetY = e.clientY - rect.top
        const height = rect.height

        const normalizedClickedHeight = Math.min(height, Math.max(0, offsetY))

        const valueVolume = (height - normalizedClickedHeight) / height

        setVideoControls(prev => ({
            ...prev,
            volume: valueVolume,
            isDraggingVolume: true
        }))

        if (valueVolume === 0) {
            setVideoControls(prev => ({
                ...prev,
                isMuted: true
            }))
        } else {
            setVideoControls(prev => ({
                ...prev,
                isMuted: false
            }))
        }

        localStorage.setItem('volume', JSON.stringify(valueVolume))
    }

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        setVideoControls(prev => ({
            ...prev,
            isDraggingVolume: false
        }))
    }

    const handleSeekChange = e => {
        const rect = e.currentTarget.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const width = rect.width

        const normalizedWidth = Math.min(width, Math.max(0, offsetX))
        const seekTime = normalizedWidth / width

        setVideoControls(prev => ({
            ...prev,
            progress: { ...prev.progress, played: seekTime }
        }))

        videoPlayerRef.current.seekTo(seekTime)
    }

    const handleDragSeek = e => {
        window.addEventListener('mousemove', handleMouseMoveSeek)
        window.addEventListener('mouseup', handleMouseUpSeek)
    }

    const handleMouseMoveSeek = e => {
        const rect = progressRef.current.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const width = rect.width

        const normalizedWidth = Math.min(width, Math.max(0, offsetX))
        const seekTime = normalizedWidth / width

        setVideoControls(prev => ({
            ...prev,
            isDraggingVolume: true,
            progress: { ...prev.progress, played: seekTime }
        }))

        videoPlayerRef.current.seekTo(seekTime)
    }

    const handleMouseUpSeek = () => {
        window.removeEventListener('mousemove', handleMouseMoveSeek)
        window.removeEventListener('mouseup', handleMouseUpSeek)
        setVideoControls(prev => ({
            ...prev,
            isDraggingVolume: false
        }))
    }

    const ACTION_ITEMS = [
        {
            type: 'like',
            icon: dataVideo.is_liked ? <LikedLargeIcon /> : <LikeLargeIcon />,
            count: <ConvertData data={dataVideo.likes_count} />
        },
        {
            type: 'comment',
            icon: <CommentLargeIcon />,
            count: <ConvertData data={dataVideo.comments_count} />
        },
        {
            type: 'flag',
            icon: <FlagLargeIcon />,
            count: <ConvertData data={dataVideo.shares_count} />
        },
        {
            type: 'share',
            icon: <ShareLargeIcon />,
            count: <ConvertData data={dataVideo.shares_count} />
        },
    ]

    const ITEM_ACTIONs = [
        {
            icon: <NotInterestIcon />,
            title: 'Not interested',
        },
        {
            icon: <FlagLargeIcon />,
            title: 'Report',
            separate: true,
            to: '/report'
        }
    ]

    return (
        data && (
            <div className={cx('wrapper')}>
                <div className={cx('video-card')}>
                    <ReactPlayer
                        ref={videoPlayerRef}
                        url={dataVideo.file_url}
                        controls={false}
                        width='100%'
                        height='100%'
                        playing={videoControls.isPlaying}
                        loop={true}
                        muted={videoControls.isMuted}
                        volume={videoControls.volume}
                        stopOnUnmount={true}

                        onClick={handleChangLinkVideo}

                        onMouseEnter={() => setVideoControls(prev => ({ ...prev, isShowAction: true }))}
                        onMouseLeave={() => setVideoControls(prev => ({ ...prev, isShowAction: false }))}

                        onReady={e => {
                            setVideoControls(prev => ({
                                ...prev,
                                duration: e.getDuration()
                            }))
                        }}

                        onProgress={e => {
                            setVideoControls(prev => ({
                                ...prev,
                                progress: e
                            }))
                        }}

                        config={{
                            file: {
                                attributes: {
                                    poster: dataVideo.thumb_url,
                                },
                            },
                        }}
                    />

                    {((videoControls.isShowAction && !videoControls.isDraggingVolume) || videoControls.isDraggingVolume) && (
                        <div
                            onMouseEnter={() => setVideoControls(prev => ({ ...prev, isShowAction: true }))}
                            onMouseLeave={() => setVideoControls(prev => ({ ...prev, isShowAction: false }))}
                        >
                            <div className={cx('mask-overlay')}></div>

                            <div className={cx('control-video')}>
                                <div
                                    onClick={e => {
                                        e.stopPropagation()
                                        setVideoControls(prev => ({
                                            ...prev,
                                            isPlaying: !prev.isPlaying
                                        }))
                                    }}
                                >
                                    {videoControls.isPlaying ? <PauseMdIcon /> : <PlayMdIcon />}
                                </div>

                                <div
                                    className={cx('control-volume-wrapper')}
                                    onClick={e => e.stopPropagation()}
                                    onMouseEnter={() => setVideoControls(prev => ({ ...prev, isHoverVolume: true }))}
                                    onMouseLeave={() => setVideoControls(prev => ({ ...prev, isHoverVolume: false }))}
                                >
                                    {((videoControls.isHoverVolume && !videoControls.isDraggingVolume) || videoControls.isDraggingVolume) && (
                                        <div className={cx('control-volume')}>
                                            <div
                                                className={cx('volume-bar')}
                                                style={{ transform: `scaleY(${videoControls.volume})` }}
                                            ></div>

                                            <div
                                                ref={progressVolumeRef}
                                                className={cx('volume-progress')}
                                                onClick={handleClickVolume}
                                                onMouseDown={handleDragVolume}
                                            ></div>

                                            <div
                                                className={cx('volume-circle')}
                                                style={{ transform: `translateY(${videoControls.volume * -36}px)` }}
                                                onMouseDown={handleDragVolume}
                                            ></div>
                                        </div>
                                    )}

                                    <div
                                        className={cx('btn-volume')}
                                        onClick={() => {
                                            setVideoControls(prev => ({
                                                ...prev,
                                                isMuted: !prev.isMuted
                                            }))

                                            if (videoControls.isMuted) {
                                                setVideoControls(prev => ({
                                                    ...prev,
                                                    volume: JSON.parse(localStorage.getItem('volume') ?? 0.5)
                                                }))
                                            } else {
                                                setVideoControls(prev => ({
                                                    ...prev,
                                                    volume: 0
                                                }))
                                            }
                                        }}
                                    >
                                        {videoControls.isMuted ? <MutedMdIcon /> : <UnMutedMdIcon />}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={cx('progress-video')}
                                onClick={e => e.stopPropagation()}
                            >
                                <div
                                    className={cx('seekbar-control')}
                                    onClick={handleSeekChange}
                                    onMouseDown={handleDragSeek}
                                >
                                    <div
                                        className={cx('seekbar-current')}
                                        style={{
                                            transform: `scaleX(${videoControls.progress.played}) translateY(-50%)`
                                        }}
                                    ></div>

                                    <div
                                        className={cx('seekbar-progress')}
                                        ref={progressRef}
                                    ></div>

                                    <div
                                        className={cx('seekbar-circle')}
                                        style={{
                                            left: `${videoControls.progress.played * 100}%`
                                        }}
                                    ></div>
                                </div>

                                <div className={cx('seekbar-time')}>
                                    <FormattedTime seconds={videoControls.progress.playedSeconds} />
                                    /<FormattedTime seconds={videoControls.duration} />
                                </div>
                            </div>

                            <div className={cx('control-bot')}></div>

                            <Tippy
                                interactive={true}
                                hideOnClick={false}
                                delay={[0, 800]}
                                placement='bottom-end'
                                appendTo={() => document.body}

                                render={attrs => (
                                    <div tabIndex='-1' {...attrs}
                                        onClick={e => {
                                            e.stopPropagation()
                                        }}
                                    >
                                        <WapperPopper>
                                            {ITEM_ACTIONs.map((item, index) => (
                                                <MenuItem key={index} data={item} onClick={() => alert('ok')} />
                                            ))}
                                        </WapperPopper>
                                    </div>
                                )}
                            >
                                <div
                                    className={cx('action-video')}
                                    onClick={e => {
                                        e.stopPropagation()
                                    }}
                                >
                                    <MoreSolidIcon />
                                </div>
                            </Tippy>
                        </div>
                    )}
                </div>

                <span
                    ref={elementRef}
                    className={cx('video-overlay')}
                ></span>

                <div className={cx('action')}>
                    {ACTION_ITEMS.map((item, index) => (
                        <React.Fragment key={index}>
                            {item.type === 'share' && (
                                <Tippy
                                    interactive={true}
                                    appendTo={() => document.body}
                                    placement='top-start'
                                    delay={[0, 500]}
                                    hideOnClick={false}

                                    render={(attrs) => (
                                        <div
                                            className="box"
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <WapperPopper>
                                                <ShareGroup />
                                            </WapperPopper>
                                        </div>
                                    )}
                                >
                                    <div className={cx('action-item')}>
                                        <div className={cx('action-icon')}>
                                            <Button nomal>
                                                {item.icon}
                                            </Button>
                                        </div>
                                        <div className={cx('action-count')}>
                                            {item.count}
                                        </div>
                                    </div>
                                </Tippy>
                            )}

                            {item.type !== 'share' && (
                                <div
                                    className={cx('action-item')}
                                    onClick={() => handleActionClick(item.type)}
                                >
                                    <div className={cx('action-icon')}>
                                        <Button nomal>
                                            {item.icon}
                                        </Button>
                                    </div>
                                    <div className={cx('action-count')}>
                                        {item.count}
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        )
    )
}

export default memo(ControlVideo)