import classNames from "classnames/bind"
import { Link, useLocation } from "react-router-dom"
import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from "react"

import style from './Contents.module.scss'
import { LockIcon, PlayIcon, MoreIconProfile, NoContent } from '~/assets/icons'
import ConvertData from '~/components/ConvertData'
import * as videoService from '~/services/videoService'
import HighlightedText from "~/components/HighlightedText"

const cx = classNames.bind(style)

function Contents({ tabClick }) {

    const desRef = useRef()

    const [dataVideo, setDataVideo] = useState([])
    const [dataUser, setDataUser] = useState({})
    const [playVideo, setPlayVideo] = useState(0)
    const playerRef = useRef(null)
    const location = useLocation()

    useEffect(() => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: location.pathname })

            if (results) {
                setDataUser(results)
                setDataVideo([...results?.videos])
            }
        }

        apiGetUserVideo()
    }, [location.pathname])

    return (
        tabClick ? (
            dataUser?.videos && dataUser?.videos?.length > 0 ? (
                <div className={cx('wrapper')}>
                    <div className={cx('post-user')}>
                        {
                            dataVideo.map((video, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => {
                                        setPlayVideo(index)
                                    }}
                                >
                                    <div
                                        className={cx('wrapper-video-items')}
                                        style={{ overflow: 'hidden', height: '245.84px' }}
                                    >
                                        <Link className={cx('link-video')} to={`/@${dataUser?.nickname}/video/${dataVideo[index].uuid}`}>
                                            <ReactPlayer
                                                ref={(ref) => (playerRef[index] = ref)}
                                                muted={true}
                                                playing={playVideo === index}
                                                width={'100%'}
                                                height={'100%'}
                                                className={cx('player-video')}
                                                url={video.file_url}

                                                onPause={() => {
                                                    playerRef[index].getInternalPlayer().load()
                                                }}

                                                config={{
                                                    file: {
                                                        attributes: {
                                                            poster: video.thumb_url,
                                                        },
                                                    },
                                                }}
                                            />

                                            <div className={cx('count-viewer')}>
                                                <PlayIcon />
                                                <span>
                                                    <ConvertData data={dataVideo[index].views_count} />
                                                </span>
                                            </div>
                                        </Link>
                                    </div>

                                    <div className={cx('description')}>
                                        <div
                                            className={cx('title')}
                                            ref={desRef}
                                        >
                                            {dataVideo[index].description}
                                        </div>
                                        <MoreIconProfile />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className={cx('error-container')}>
                    <div className={cx('error-lock')}>
                        <NoContent />
                    </div>

                    <div className={cx('error-title')}>
                        No content
                    </div>

                    <div className={cx('error-des')}>
                        This user has not published any videos.
                    </div>
                </div>
            )
        ) : (
            <div className={cx('error-container')}>
                <div className={cx('error-lock')}>
                    <LockIcon />
                </div>

                <div className={cx('error-title')}>
                    This user's liked videos are private
                </div>

                <div className={cx('error-des')}>
                    Videos liked by {dataUser?.nickname} are currently hidden
                </div>
            </div>
        )
    )
}

export default Contents