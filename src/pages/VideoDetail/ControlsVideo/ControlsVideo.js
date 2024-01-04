import classNames from 'classnames/bind'
import { useState, useRef } from 'react'
import ReactPlayer from 'react-player'

import styles from './ControlsVideo.module.scss'
import { FormattedTime } from '~/components/ConvertData'
import { PlayLargeIcon } from '~/assets/icons'

const cx = classNames.bind(styles)

function ControlsVideo({ data, ...props }) {
    const [playVideo, setPlayVideo] = useState(true)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [seekTime, setSeekTime] = useState(0)
    const videoRef = useRef()
    const seekRef = useRef()
    const progressRef = useRef()

    const handleClickSeekChange = e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const width = rect.width;

        const normalizedClickedWidth = Math.min(width, Math.max(0, offsetX));

        setSeekTime(normalizedClickedWidth / width)
        videoRef.current.seekTo(normalizedClickedWidth / width)
    }

    const hanldleDragSeek = e => {
        const rect = progressRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const width = rect.width;

        const normalizedClickedWidth = Math.min(width, Math.max(0, offsetX));

        setSeekTime(normalizedClickedWidth / width)
        setProgress(normalizedClickedWidth / width * duration)
        videoRef.current.seekTo(normalizedClickedWidth / width)
    }

    return (
        <div
            className={cx('video__content')}
            onClick={() => {
                setPlayVideo(!playVideo)
            }}
        >
            <ReactPlayer
                ref={videoRef}
                width={'100%'}
                height={'100%'}
                url={data && data?.file_url}
                playing={playVideo}
                stopOnUnmount={false}
                controls={false}
                muted={props.muted}
                fallback={<div>Loading...</div>}

                onReady={e => {
                    setDuration(e.getDuration())
                    setPlayVideo(true)
                }}

                onEnded={() => {
                    setPlayVideo(false)
                }}

                onPause={e => {
                    setPlayVideo(false)
                }}

                onProgress={e => {
                    setProgress(e.playedSeconds)
                    setSeekTime(e.played)
                }}
            ></ReactPlayer>

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
                        onDrag={hanldleDragSeek}
                        onDragEnd={hanldleDragSeek}
                    >

                    </div>

                    <div
                        className={cx('seekbar-circle')}
                        style={{
                            left: `calc(${seekTime * 100}%)`,
                        }}
                        onDrag={hanldleDragSeek}
                        onDragEnd={hanldleDragSeek}
                    ></div>
                </div>

                <div className={cx('seekbar-time')}>
                    <FormattedTime
                        seconds={progress}
                    />
                    <span>/</span>
                    <FormattedTime
                        // seconds={data.meta.playtime_seconds}
                        seconds={duration}
                    />
                </div>
            </div>

            {!playVideo && <PlayLargeIcon className={cx('btn-play')} />}
        </div>
    )
}

export default ControlsVideo;