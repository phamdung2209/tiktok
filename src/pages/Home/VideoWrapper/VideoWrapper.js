import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Tippy from '@tippyjs/react/headless'
import { Wrapper } from '~/components/Popper'

import styles from './VideoWrapper.module.scss'
import Button from '~/components/Button'
import { MusicIcon, LocateIcon } from '~/assets/icons'
import ControlVideo from './ControlVideo'
import Image from '~/components/Image'
import images from '~/assets/images'
import * as followService from '~/services/followService'
import HighlightedText from '~/components/HighlightedText'

const cx = classNames.bind(styles)

function VideoWrapper({ data, ...props }) {
    const [dataVideo, setDataVideo] = useState(data)

    const handleFollowUser = useCallback(idUser => {
        const followUser = async ({ idUser }) => {
            const results = await followService.followUser({ idUser })

            if (results) {
                setDataVideo({
                    ...dataVideo,
                    user: {
                        ...dataVideo.user,
                        is_followed: true
                    }
                })
            }
        }

        followUser({ idUser })
    }, [dataVideo])

    const handleUnFollowUser = useCallback(idUser => {
        const unfollowUser = async ({ idUser }) => {
            const results = await followService.unfollowUser({ idUser })

            if (results) {
                setDataVideo({
                    ...dataVideo,
                    user: {
                        ...dataVideo.user,
                        is_followed: false
                    }
                })
            }
        }

        unfollowUser({ idUser })
    }, [dataVideo])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('info-text')}>
                    {/* <Tippy
                        appendTo={() => document.body}
                        interactive={true}
                        delay={[0, 500]}

                        render={attrs => (
                            <div tabIndex='-1' {...attrs}>
                                <Wrapper>
                                    <AccountPreview data={data.user} />
                                </Wrapper>
                            </div>
                        )}
                    > */}
                    <Link
                        to={`/@${data.user.nickname}`} className={cx('author')}
                        onMouseEnter={() => props.setActions({ ...props.actions, isHoverUser: true })}
                        onMouseLeave={() => props.setActions({ ...props.actions, isHoverUser: false })}
                    >
                        <h3
                            style={{ 'textDecoration': props.actions.isHoverUser ? 'underline' : 'none' }}
                        >
                            {data.user.nickname}
                        </h3>
                        <h4>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </Link>
                    {/* </Tippy> */}

                    <div className={cx('info-des')}>
                        <div className=''>
                            <HighlightedText data={data.description} />
                        </div>
                    </div>

                    <div className={cx('info-sound')}>
                        <div className={cx('video-music')}>
                            <Link to='#'>
                                <MusicIcon />
                                <div>
                                    original sound -{' '}
                                    {data.music ? data.music
                                        : data.user.first_name && data.user.last_name
                                            ? `${data.user.first_name} ${data.user.last_name}`
                                            : data.user.nickname}
                                </div>
                            </Link>
                        </div>

                        {data.allows.includes('duet') && (
                            <div className={cx('anchor-tag')}>
                                <Link to='#' className={cx('anchor-container')}>
                                    <Image
                                        src={images.capCut}
                                        alt=' '
                                        fallBack='https://p9-sg.tiktokcdn.com/obj/tiktok-obj/capcut_logo_64px_bk.png'
                                    />

                                    <div className={cx('anchor-tag-name')}>
                                        CapCut | Try this template
                                    </div>
                                </Link>
                            </div>
                        )}

                        <div className={cx('anchor-tag')}>
                            <Link to='#' className={cx('anchor-container')}>
                                <LocateIcon />

                                <div className={cx('anchor-tag-name')}>
                                    Viet Nam
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>

                <div className={cx('info-btn')}>
                    {dataVideo.user.is_followed && (
                        <Button
                            dark
                            onClick={() => handleUnFollowUser(data.user.id)}
                        >
                            Following
                        </Button>
                    )}

                    {!dataVideo.user.is_followed && (
                        <Button
                            outline
                            onClick={() => handleFollowUser(data.user.id)}
                        >
                            Follow
                        </Button>
                    )}
                </div>
            </div>

            <div className={cx('video')}>
                <ControlVideo data={data} />
            </div>
        </div>
    )
}

export default VideoWrapper;