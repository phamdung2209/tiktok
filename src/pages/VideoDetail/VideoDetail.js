import classNames from 'classnames/bind'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'

import styles from './VideoDetail.module.scss'
import Button from '~/components/Button'
import {
    CloseIconBold,
    ReportMode,
    MusicIcon,
    LikeIcon,
    Liked,
    CommentIcon,
    FlagIcon,
    Embed,
    SendIcon,
    FacebookIcon,
    WhatsAppIcon,
    Twitterfill,
    Sharefill,
    Tick,
    A,
    Emotion,
    VoiceMutedIcon,
    PrevIcon,
    NextIcon,
    VoiceIcon,
} from '~/assets/icons'
import Search from '~/layouts/DefaultLayout/components/Search'
import Image from '~/components/Image'
import Comment from './Comment'
import CreatorVideos from './CreatorVideos'
import * as videoService from '~/services/videoService'
import * as followService from '~/services/followService'
import { FormattedDate } from '~/components/ConvertData/'
import AccountPreview from '~/components/SuggestAccounts/AccountPreview'
import { Wrapper as WrapperPopper } from '~/components/Popper'
import ControlsVideo from './ControlsVideo'
import Login from '~/layouts/Login'

const cx = classNames.bind(styles)

function VideoDetail() {
    const [line, setLine] = useState(0)
    const [data, setData] = useState([])
    const [muted, setMuted] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const navigator = useNavigate()
    const accessToken = localStorage.getItem('accessToken')

    // post comment
    const [commentValue, setCommentValue] = useState('')
    const postRef = useRef()
    const [postComment, setPostComment] = useState({})

    const location = useLocation()
    const uuid = location.pathname.split('/')[3]

    useEffect(() => {
        if (!accessToken) {
            setOpenModal(true)
        }

        const apiGetUserVideo = async () => {
            const results = await videoService.getVideo({ uuid: uuid })

            if (results) {
                setData(results)
            }
        }

        apiGetUserVideo()
    }, [location.pathname, accessToken, uuid])

    useEffect(() => {
        const updateTitle = () => {
            if (location.pathname.startsWith('/@') && data) {
                document.title = `${data?.user?.first_name} ${data?.user?.last_name} (@${data?.user?.nickname}) | TikTok`
            } else {
                document.title = '| TikTok'
            }
        }

        if (
            data &&
            data?.user?.first_name !== undefined &&
            data?.user?.last_name !== undefined &&
            data?.user?.nickname !== undefined
        ) {
            updateTitle()
        }
    }, [data, location.pathname])

    const handleCloseTab = () => {
        navigator(`/@${data.user.nickname}`)
    }

    const handleLikeVideos = (item) => {
        if (item.type === 'like') {
            if (data.is_liked) {
                const actionUnLike = async () => {
                    const results = await videoService.actionUnLikeVideos({ uuid: uuid })

                    if (results) {
                        setData(results)
                    }
                }

                actionUnLike()
            } else {
                const actionLike = async () => {
                    const results = await videoService.actionLikeVideos({ uuid: uuid })

                    if (results) {
                        setData(results)
                    }
                }

                actionLike()
            }
        }
    }

    const handleFollowUser = () => {
        if (!accessToken) {
            setOpenModal(true)
            return
        }
        const actionFollow = async () => {
            const results = await followService.followUser({ idUser: data.user_id })

            setData({
                ...data,
                user: {
                    ...data.user,
                    is_followed: results.is_followed,
                },
            })
        }

        actionFollow()
    }

    const handleUnfollowUser = () => {
        const actionFollow = async () => {
            const results = await followService.unfollowUser({ idUser: data.user_id })

            setData({
                ...data,
                user: {
                    ...data.user,
                    is_followed: results.is_followed,
                },
            })
        }

        actionFollow()
    }

    const handleTextChange = (e) => {
        const value = e.target.value
        if (!value.startsWith(' ')) {
            setCommentValue(e.target.value)
        }
    }

    const handleSubmitComment = () => {
        if (commentValue) {
            const apiPostComment = async () => {
                const results = await videoService.postComment(uuid, commentValue)

                setPostComment(results)
            }

            apiPostComment()
        }

        setCommentValue('')
        postRef.current.focus()
    }
    const [hasPrev, setHasPrev] = useState(false)
    const [hasNext, setHasNext] = useState(false)
    useEffect(() => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: `/${location.pathname.split('/')[1]}` })

            if (results) {
                const index = results.videos.findIndex((item) => item.uuid === data.uuid)

                if (results.videos.length === 1) {
                    setHasPrev(false)
                    setHasNext(false)
                } else {
                    if (index <= 0) {
                        setHasPrev(false)
                        setHasNext(true)
                    } else if (index > 0 && index < results.videos.length - 1) {
                        setHasPrev(true)
                        setHasNext(true)
                    } else if (index >= results.videos.length - 1) {
                        setHasNext(false)
                        setHasPrev(true)
                    } else {
                        setHasPrev(false)
                    }
                }
            }
            console.log(results.videos.length);
        }

        apiGetUserVideo()
    }, [location.pathname, data.uuid])

    const handleChangePrevVideo = () => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: `/@${data.user.nickname}` })

            if (results) {
                const index = results.videos.findIndex((item) => item.uuid === data.uuid)

                if (index > 0) {
                    setData(results.videos[index - 1])
                    navigator(`/@${data.user.nickname}/video/${results.videos[index - 1].uuid}`)
                }
            }
        }

        apiGetUserVideo()
    }

    const handleChangeNextVideo = () => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: `/@${data.user.nickname}` })

            if (results) {
                const index = results.videos.findIndex((item) => item.uuid === data.uuid)

                if (index < results.videos.length - 1) {
                    setData(results.videos[index + 1])
                    navigator(`/@${data.user.nickname}/video/${results.videos[index + 1].uuid}`)
                }
            }
        }

        apiGetUserVideo()
    }

    const LIKE_GROUPS = [
        {
            type: 'like',
            icon: data && data?.is_liked ? <Liked /> : <LikeIcon />,
            count: data && data?.likes_count,
        },
        {
            type: 'comment',
            icon: <CommentIcon />,
            count: data && data?.comments_count,
        },
        {
            type: 'flag',
            icon: <FlagIcon />,
            count: data && data?.shares_count,
        },
    ]

    const SHARE_GROUPS = [
        {
            icon: <Embed />,
            to: '#',
        },
        {
            icon: <SendIcon />,
            to: '#',
        },
        {
            icon: <FacebookIcon />,
            to: '#',
        },
        {
            icon: <WhatsAppIcon />,
            to: '#',
        },
        {
            icon: <Twitterfill />,
            to: '#',
        },
        {
            icon: <Sharefill />,
        },
    ]

    return (
        data &&
        data?.user && (
            <div className={cx('wrapper')}>
                <div className={cx('video')}>
                    <div className={cx('blur')}>
                        <Image alt=" " src={data && data?.thumb_url} />
                    </div>

                    <div className={cx('header')}>
                        <Button nomal onClick={handleCloseTab}>
                            <CloseIconBold />
                        </Button>

                        <div>
                            <Search />
                        </div>

                        <div className={cx('btn-report')}>
                            <ReportMode />
                            Report
                        </div>
                    </div>

                    <ControlsVideo data={data} muted={muted} />
                    {hasPrev && (
                        <Button nomal className={cx('prev-video', 'btn-change-video')} onClick={handleChangePrevVideo}>
                            <PrevIcon />
                        </Button>
                    )}

                    {hasNext && (
                        <Button nomal className={cx('next-video', 'btn-change-video')} onClick={handleChangeNextVideo}>
                            <NextIcon />
                        </Button>
                    )}

                    <div className={cx('voice-controls')}>
                        <div className={cx('volume-control')}>
                            <div className={cx('volume-progress')}></div>

                            <div className={cx('volume-circle')}></div>

                            <div className={cx('volume-control-bar')}></div>
                        </div>

                        <Button nomal onClick={() => setMuted(!muted)}>
                            {muted ? <VoiceMutedIcon /> : <VoiceIcon />}
                        </Button>
                    </div>
                </div>

                <div className={cx('description')}>
                    <div className={cx('des-header')}>
                        <div className={cx('header-container')}>
                            <div className={cx('profile-wrapper')}>
                                <div className={cx('pro-des')}>
                                    <div className={cx('pro-des-info')}>
                                        <Tippy
                                            interactive={true}
                                            delay={[800, 0]}
                                            appendTo={document.body}
                                            render={(attrs) => (
                                                <div tabIndex="-1" {...attrs}>
                                                    <WrapperPopper>
                                                        <AccountPreview data={data.user} />
                                                    </WrapperPopper>
                                                </div>
                                            )}
                                        >
                                            <Link to={`/@${data && data?.user?.nickname}`}>
                                                <Image
                                                    src={data && data?.user?.avatar}
                                                    alt=" "
                                                    className={cx('pro-des-info__avatar')}
                                                />

                                                <div className={cx('info-user')}>
                                                    <div className={cx('pro-des-info__nickname')}>
                                                        <span>{data && data?.user?.nickname}</span>

                                                        {data && data?.user?.tick && <Tick />}
                                                    </div>

                                                    <div className={cx('pro-des-info__name')}>
                                                        <span>
                                                            {data &&
                                                                `${data?.user?.first_name} ${data?.user?.last_name}`}
                                                        </span>
                                                        <span style={{ margin: '0px 4px' }}> · </span>
                                                        <span>
                                                            {/* {formattedDate()} */}
                                                            <FormattedDate data={data && data?.published_at} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Tippy>

                                        {data.user.is_followed ? (
                                            <Button dark onClick={handleUnfollowUser}>
                                                Following
                                            </Button>
                                        ) : (
                                            <>
                                                <Button primary onClick={handleFollowUser}>
                                                    Follow
                                                </Button>

                                                {openModal &&
                                                    ReactDOM.createPortal(
                                                        <Login setOpenModal={setOpenModal} />,
                                                        document.body,
                                                    )}
                                            </>
                                        )}
                                    </div>

                                    <div className={cx('pro-des-content')}>
                                        <div className={cx('main-content')}>
                                            {data && data.description} #couple #lovestory
                                        </div>

                                        <div className={cx('music')}>
                                            <Link to="#">
                                                <MusicIcon />
                                                original sound -{' '}
                                                {data && data?.music
                                                    ? data.music
                                                    : `${data?.user?.first_name} ${data?.user?.last_name}`}
                                            </Link>
                                        </div>

                                        <div className={cx('AnchorTagWrapper')}></div>
                                    </div>
                                </div>

                                <div className={cx('like-share')}>
                                    <div className={cx('like-share-wrapper')}>
                                        <div className={cx('center-row')}>
                                            <div className={cx('like-group', 'groups')}>
                                                {LIKE_GROUPS.map((item, index) => (
                                                    <div key={index} className={cx('like-group__item', 'group__item')}>
                                                        <Button nomal onClick={() => handleLikeVideos(item)}>
                                                            {item.icon}
                                                        </Button>

                                                        <strong>{item.count}</strong>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={cx('share-group', 'groups')}>
                                                {SHARE_GROUPS.map((item, index) => (
                                                    <div key={index} className={cx('share-group__item', 'group__item')}>
                                                        <Button nomal to={item.to}>
                                                            {item.icon}
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={cx('copy-link-container')}>
                                            <div className={cx('text-copy-link')}>{window.location.href}</div>

                                            <div
                                                className={cx('btn-copy-link')}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(window.location.href)
                                                    console.log(navigator.clipboard)
                                                    // ??
                                                    alert('Copied!')
                                                }}
                                            >
                                                Copy Link
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('tab-menu-wrapper')}>
                                <div className={cx('menu-tabs')}>
                                    <div
                                        className={cx('tab-item', { active: line === 0 })}
                                        onClick={() => {
                                            setLine(0)
                                        }}
                                    >
                                        Comments ({data && data?.comments_count})
                                    </div>
                                    <div
                                        className={cx('tab-item', { active: line === 1 })}
                                        onClick={() => {
                                            setLine(1)
                                        }}
                                    >
                                        Creator Videos
                                    </div>
                                </div>

                                <div className={cx('menu-tabs-line')}></div>
                            </div>

                            <div className={cx('comment-wrapper')}>
                                {line === 0 ? (
                                    // <Comment comments={comments} />
                                    <Comment postComment={postComment} />
                                ) : (
                                    <CreatorVideos />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={cx('des-bottom')}>
                        <div className={cx('comment-by-me')}>
                            <input
                                type="text"
                                placeholder="Add comment..."
                                spellCheck={false}
                                onChange={handleTextChange}
                                value={commentValue}
                                ref={postRef}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmitComment()
                                    }
                                }}
                            />
                            <A />
                            <Emotion />
                        </div>

                        <div className={cx('post')} onClick={handleSubmitComment}>
                            Post
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default VideoDetail
