import classNames from 'classnames/bind'
import { useState, useRef, useEffect } from 'react'

import styles from './VolumeControl.module.scss'
import Button from '~/components/Button'
import { VoiceIcon, VoiceMutedIcon } from '~/assets/icons'

const cx = classNames.bind(styles)

function VolumeControl({ muted, setMuted, ...props }) {
    let positionVolume
    if (props.volume * -73 >= -8) {
        positionVolume = -8
    } else if (props.volume * -73 <= -73) {
        positionVolume = -73
    } else {
        positionVolume = props.volume * -73
    }

    const [volume, setVolume] = useState(positionVolume)
    const heightRef = useRef()
    const [isHoverVolume, setIsHoverVolume] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        if (muted) {
            setVolume(-8)
        } else {
            setVolume(positionVolume)
        }
    }, [muted, positionVolume])

    useEffect(() => {
        if (positionVolume === -8) {
            setMuted(true)
        } else {
            setMuted(false)
        }
    }, [positionVolume, setMuted])

    useEffect(() => {
        localStorage.setItem('volume', props.volume)
    }, [props.volume])

    const handleClickVolume = e => {
        const rect = e.currentTarget.getBoundingClientRect()
        const offsetY = e.clientY - rect.top
        const height = rect.height

        const normalizedClickedHeight = Math.min(height, Math.max(0, offsetY))

        const normalizedValue = (height - normalizedClickedHeight) / height

        props.setVolume(normalizedValue)
        if (normalizedClickedHeight - height >= -8) {
            setVolume(-8)
        } else if (normalizedClickedHeight - height <= -73) {
            setVolume(-73)
        } else {
            setVolume(normalizedClickedHeight - height)
        }
    }

    const handleMouseDown = e => {
        setIsDragging(true)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = e => {
        const rect = heightRef.current.getBoundingClientRect()

        const offsetY = e.clientY - rect.top
        const height = rect.height

        const normalizedClickedHeight = Math.min(height, Math.max(0, offsetY))

        const normalizedValue = (height - normalizedClickedHeight) / height
        props.setVolume(normalizedValue)

        if (normalizedClickedHeight - height >= -8) {
            setVolume(-8)
        } else if (normalizedClickedHeight - height <= -73) {
            setVolume(-73)
        } else {
            setVolume(normalizedClickedHeight - height)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false);
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
    }

    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('voice-controls')}
                onMouseEnter={() => setIsHoverVolume(true)}
                onMouseLeave={() => setIsHoverVolume(false)}
            >
                {((isHoverVolume && !isDragging) || isDragging) && (
                    <div className={cx('volume-control')}>

                        <div
                            className={cx('volume-control-bar')}
                            style={{ transform: `scaleY(${props.volume})` }}
                        ></div>

                        <div
                            ref={heightRef}
                            className={cx('volume-progress')}
                            onClick={handleClickVolume}
                            onMouseDown={handleMouseDown}
                        ></div>

                        <div
                            className={cx('volume-circle')}
                            onMouseDown={handleMouseDown}

                            style={{
                                transform: `translateY(${volume}px)`
                            }}
                        ></div>
                    </div>
                )}

                <Button
                    nomal
                    onClick={() => setMuted(!muted)}
                >
                    {muted ? <VoiceMutedIcon /> : <VoiceIcon />}
                </Button>
            </div>
        </div>
    )
}

export default VolumeControl