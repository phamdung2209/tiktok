import classNames from "classnames/bind"
import { Link } from "react-router-dom"
import ReactPlayer from 'react-player'
import { useEffect, useRef, useState } from "react"

import style from './Contents.module.scss'
import { LockIcon, PlayIcon, MoreIconProfile } from '~/assets/icons'
import ConvertData from '~/components/ConvertData'
import * as videoService from '~/services/videoService'

const cx = classNames.bind(style)

function Contents({ tabClick }) {

    const desRef = useRef()

    const [dataVideo, setDataVideo] = useState([])
    const [dataUser, setDataUser] = useState({})

    useEffect(() => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: window.location.pathname })
            setDataUser(results)
            setDataVideo([...results.videos])
        }

        apiGetUserVideo()
    }, [])

    console.log(window.location.pathname)
    return (
        tabClick ? (
            <div className={cx('wrapper')}>
                <div className={cx('post-user')}>
                    {
                        dataVideo.map((video, index) => (
                            <div
                                key={index}
                            >
                                <div
                                    className={cx('wrapper-video-items')}
                                    style={{ overflow: 'hidden', height: '245.84px' }}
                                >
                                    <Link className={cx('link-video')} to={`/@${dataUser.nickname}/video/${dataVideo[index].uuid}`}>
                                        <ReactPlayer
                                            width={'100%'}
                                            height={'100%'}
                                            className={cx('player-video')}
                                            url={video.file_url}
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
                    <LockIcon />
                </div>

                <div className={cx('error-title')}>
                    This user's liked videos are private
                </div>

                <div className={cx('error-des')}>
                    Videos liked by emiliopiano are currently hidden
                </div>
            </div>
        )
    )
}

export default Contents;