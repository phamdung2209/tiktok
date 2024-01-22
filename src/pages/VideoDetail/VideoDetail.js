import classNames from 'classnames/bind'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useEffect, useState, useRef, useContext } from 'react'
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
    PrevIcon,
    NextIcon,
    LocateIcon,
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
import VolumeControl from './VolumeControl'
import { UserContext } from '~/hooks'
import VideoSetting from './VideoSetting'
import images from '~/assets/images'
import ToastMessage from '~/components/ToastMessage'
import HighlightedText from '~/components/HighlightedText'

const cx = classNames.bind(styles)

function VideoDetail() {
    const [line, setLine] = useState(0)
    const [data, setData] = useState([])
    const [muted, setMuted] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [changeVideo, setChangeVideo] = useState({
        prev: false,
        next: false,
    })
    const [actions, setActions] = useState({
        showToast: false,
        isCopyLink: false,
    })

    const [volume, setVolume] = useState(JSON.parse(localStorage.getItem('volume')) ?? 0.5)
    const [attrs, setAttrs] = useState({
        isFocusText: false,
        validText: false,
    })

    const { loggedInUserData, user } = useContext(UserContext)

    const navigate = useNavigate()
    const accessToken = localStorage.getItem('accessToken')

    // post comment
    const [commentValue, setCommentValue] = useState('')
    const postRef = useRef()
    const [postComment, setPostComment] = useState({})

    const location = useLocation()
    const uuid = location.pathname.split('/')[3]

    useEffect(() => {
        setIsDelete(false)
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
    }, [location.pathname, accessToken, uuid, postComment, isDelete])

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
        navigate(`/@${data.user.nickname}`)
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
            setAttrs({
                ...attrs,
                validText: true,
            })
        }
    }

    const handleSubmitComment = () => {
        if (attrs.validText === false) return

        if (commentValue) {
            const apiPostComment = async () => {
                const results = await videoService.postComment(uuid, commentValue)

                setPostComment(results)
            }

            apiPostComment()
        }

        setCommentValue('')
        postRef.current.focus()

        setAttrs({
            ...attrs,
            validText: false,
        })
    }

    useEffect(() => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: `/${location.pathname.split('/')[1]}` })

            if (results) {
                const index = results.videos.findIndex((item) => item.uuid === data.uuid)

                if (results.videos.length === 1) {
                    setChangeVideo({
                        prev: false,
                        next: false,
                    })
                } else {
                    if (index <= 0) {
                        setChangeVideo({
                            prev: false,
                            next: true,
                        })
                    } else if (index > 0 && index < results.videos.length - 1) {
                        setChangeVideo({
                            prev: true,
                            next: true,
                        })
                    } else if (index >= results.videos.length - 1) {
                        setChangeVideo({
                            prev: true,
                            next: false,
                        })
                    } else {
                        setChangeVideo({
                            ...changeVideo,
                            prev: false,
                        })
                    }
                }
            }
        }

        apiGetUserVideo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, data.uuid])

    const handleChangePrevVideo = () => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: `/@${data.user.nickname}` })

            if (results) {
                const index = results.videos.findIndex((item) => item.uuid === data.uuid)

                if (index > 0) {
                    setData(results.videos[index - 1])
                    navigate(`/@${data.user.nickname}/video/${results.videos[index - 1].uuid}`)
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
                    navigate(`/@${data.user.nickname}/video/${results.videos[index + 1].uuid}`)
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
                        <div className={cx('btn-close')}>
                            <Button nomal onClick={handleCloseTab}>
                                <CloseIconBold />
                            </Button>
                        </div>

                        <div>
                            <Search />
                        </div>

                        <div className={cx('btn-report')}>
                            <ReportMode />
                            Report
                        </div>
                    </div>

                    <ControlsVideo
                        postRef={postRef}
                        // setMuted={setMuted}
                        data={data}
                        muted={muted}
                        setVolume={setVolume}
                        volume={volume}
                        isFocusText={attrs.isFocusText}
                    />

                    {changeVideo.prev && (
                        <Button nomal className={cx('prev-video', 'btn-change-video')} onClick={handleChangePrevVideo}>
                            <PrevIcon />
                        </Button>
                    )}

                    {changeVideo.next && (
                        <Button nomal className={cx('next-video', 'btn-change-video')} onClick={handleChangeNextVideo}>
                            <NextIcon />
                        </Button>
                    )}

                    <VolumeControl volume={volume} setVolume={setVolume} muted={muted} setMuted={setMuted} />
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
                                                            <FormattedDate data={data && data?.published_at} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Tippy>

                                        {loggedInUserData.nickname === data.user.nickname ? (
                                            <VideoSetting />
                                        ) : (
                                            data.user.is_followed ? (
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
                                            )
                                        )}

                                    </div>

                                    <div className={cx('pro-des-content')}>
                                        <div className={cx('main-content')}>
                                            <HighlightedText data={data && data.description} />
                                        </div>

                                        <div className={cx('music')}>
                                            <Link to="#">
                                                <MusicIcon />
                                                original sound -{' '}
                                                {data && data?.music
                                                    ? data.music
                                                    : data.user.first_name && data.user.last_name
                                                        ? `${data?.user?.first_name} ${data?.user?.last_name}`
                                                        : data.user.nickname}
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
                                                    if (actions.isCopyLink) return

                                                    navigator.clipboard.writeText(window.location.href)
                                                    setActions(prev => ({
                                                        ...prev,
                                                        showToast: true,
                                                        isCopyLink: true,
                                                    }))

                                                    setTimeout(() => {
                                                        setActions(prev => ({
                                                            ...prev,
                                                            showToast: false,
                                                            isCopyLink: false,
                                                        }))
                                                    }, 5000)
                                                }}
                                            >
                                                Copy Link
                                            </div>

                                            {actions.showToast && (ReactDOM.createPortal(<ToastMessage message='Link copied to clipboard!' />, document.body))}
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
                                    <Comment
                                        data={data}
                                        postComment={postComment}
                                        isDelete={isDelete}
                                        setIsDelete={setIsDelete}
                                    />
                                ) : (
                                    <CreatorVideos />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={cx('des-bottom')}>
                        {user.auth ? (
                            <>
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
                                        onFocus={() => {
                                            setAttrs({
                                                ...attrs,
                                                isFocusText: true,
                                            })
                                        }}

                                        onBlur={() => {
                                            setAttrs({
                                                ...attrs,
                                                isFocusText: false,
                                            })
                                        }}
                                    />
                                    <A />
                                    <Emotion />
                                </div>

                                <div className={cx(
                                    'post',
                                    { disabled: !attrs.validText })}
                                    onClick={handleSubmitComment}
                                >
                                    Post
                                </div>
                            </>
                        ) : (
                            <div className={cx('login-require')}>
                                Log in to comment
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

export default VideoDetail
