import classNames from 'classnames/bind'
import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'

import styles from './ControlsVideo.module.scss'
import { FormattedTime } from '~/components/ConvertData'
import { PlayLargeIcon, SeekIcon } from '~/assets/icons'

const cx = classNames.bind(styles)

function ControlsVideo({ data, ...props }) {
    const [playVideo, setPlayVideo] = useState(true)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [seekTime, setSeekTime] = useState(0)
    const videoRef = useRef()
    const seekRef = useRef()
    const progressRef = useRef()
    const navigator = useNavigate()
    const [seekArrow, setSeekArrow] = useState({
        left: false,
        right: false,
        isSeek: false,
        timeHide: 0,
        timer: null,
    })

    const handleClickSeekChange = e => {
        const rect = e.currentTarget.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const width = rect.width

        const normalizedClickedWidth = Math.min(width, Math.max(0, offsetX))

        setSeekTime(normalizedClickedWidth / width)
        videoRef.current.seekTo(normalizedClickedWidth / width)
    }

    useEffect(() => {
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                setPlayVideo(false)
            } else {
                setPlayVideo(true)
            }
        })

        return () => {
            window.removeEventListener('visibilitychange', () => {
                if (document.visibilityState === 'hidden') {
                    setPlayVideo(false)
                } else {
                    setPlayVideo(true)
                }
            })
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = e => {
            if (props.isFocusText) return;

            if (e.key === ' ') {
                setPlayVideo(prevPlayVideo => !prevPlayVideo);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setPlayVideo, props.isFocusText]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                navigator(`/@${data.user.nickname}`)
            }
        }

        window.addEventListener('keydown', handleEsc)

        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.user.nickname])

    useEffect(() => {
        if (seekArrow.isSeek) {
            if (seekArrow.timer !== null) {
                clearTimeout(seekArrow.timer)
            }

            seekArrow.timer = setTimeout(() => {
                setSeekArrow(prevState => ({
                    ...prevState,
                    isSeek: false,
                }))
            }, seekArrow.timeHide)
        }

        return () => {
            clearTimeout(seekArrow.timer)
        }

    }, [seekArrow.isSeek, seekArrow.timer, seekArrow.timeHide])

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') {
                videoRef.current.seekTo(progress - 3)
                setSeekArrow({
                    left: true,
                    right: false,
                    isSeek: true,
                    timeHide: seekArrow.timeHide >= 3000 ? 3000 : seekArrow.timeHide + 3000,
                })
            }

            if (e.key === 'ArrowRight') {
                videoRef.current.seekTo(progress + 3)
                setSeekArrow({
                    left: false,
                    right: true,
                    isSeek: true,
                    timeHide: seekArrow.timeHide >= 3000 ? 3000 : seekArrow.timeHide + 3000,
                })
            }
        }

        document.addEventListener('keydown', handleKeyPress)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [progress, seekArrow.timeHide])

    const handleMouseDown = () => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = e => {
        const rect = progressRef.current.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const width = rect.width

        const normalizedWidth = Math.min(width, Math.max(0, offsetX))

        setSeekTime(normalizedWidth / width)
        setProgress(normalizedWidth / width * duration)
        videoRef.current.seekTo(normalizedWidth / width)
    }

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    }

    return (
        <div
            className={cx('video__content')}
            onClick={() => {
                setPlayVideo(!playVideo)
            }}
        >
            <ReactPlayer
                url={data && data?.file_url}
                ref={videoRef}
                controls={false}
                width={'100%'}
                height={'100%'}
                muted={props.muted}
                playing={playVideo}
                fallback={<div>Loading...</div>}
                volume={props.volume}
                loop={true}
                stopOnUnmount={false}

                onReady={e => {
                    setDuration(e.getDuration())
                    setPlayVideo(true)
                }}

                onError={e => {
                    console.log(e)
                }}

                onPause={() => {
                    setPlayVideo(false)
                }}

                onProgress={e => {
                    setProgress(e.playedSeconds)
                    setSeekTime(e.played)
                }}

                config={{
                    file: {
                        attributes: {
                            poster: data && data?.thumb_url,
                        },
                    },
                }}
            />

            {seekArrow.isSeek && (
                <div className={cx('animation-seek-video')}>
                    {seekArrow.left && (
                        <>
                            <span>Skipped backward 3 seconds</span>
                            <div className={cx('seek-arrow')} style={{ transform: 'rotateZ(180deg)', translate: '-2px' }}>
                                <SeekIcon />
                            </div>
                        </>
                    )}

                    {seekArrow.right && (
                        <>
                            <div className={cx('seek-arrow')} style={{ translate: '2px' }}>
                                <SeekIcon />
                            </div>
                            <span>Skipped forward 3 seconds</span>
                        </>
                    )}
                </div>
            )}

            <div
                className={cx('controls-custom')}
                onClick={e => {
                    e.stopPropagation()
                }}
            >
                <div className={cx('seekbar-progress')}>
                    <div
                        ref={seekRef}
                        className={cx('current-seek')}
                        style={{
                            transform: `scaleX(${seekTime}) translateY(-50%)`,
                        }}
                        onClick={handleClickSeekChange}
                    ></div>

                    <div
                        ref={progressRef}
                        className={cx('progress')}
                        onClick={handleClickSeekChange}
                        onMouseDown={handleMouseDown}
                    ></div>

                    <div
                        className={cx('seekbar-circle')}
                        style={{
                            left: `calc(${seekTime * 100}%)`,
                        }}
                        onMouseDown={handleMouseDown}
                    ></div>
                </div>

                <div className={cx('seekbar-time')}>
                    <FormattedTime
                        seconds={progress}
                    />
                    <span>/</span>
                    <FormattedTime seconds={duration} />
                </div>
            </div>

            {!playVideo && <PlayLargeIcon className={cx('btn-play')} />}
        </div>
    )
}

export default ControlsVideo