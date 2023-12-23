import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import Tippy from '@tippyjs/react/headless'

import style from './Profile.module.scss'
import Image from '~/components/Image'
import { TickLarge, LinkIcon, NoContent, EditIcon } from '~/assets/icons'
import Button from '~/components/Button'
import { ShareIcon, MoreIconW } from '~/assets/icons'
import LayoutVideo from './NavVideo'
import * as videoService from '~/services/videoService'
import ConvertData from '~/components/ConvertData'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import ShareGroup from './ShareGroup'
import MoreAction from './MoreAction'
import { UserContext } from '~/hooks'
import * as followService from '~/services/followService'


const cx = classNames.bind(style)

function Profile() {
    const [dataUser, setDataUser] = useState({})
    const location = useLocation()
    const [followingLists, setFollowingLists] = useState([])
    const { loggedInUserData } = useContext(UserContext)

    useEffect(() => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: location.pathname })
            setDataUser(results)
        }
        apiGetUserVideo()
    }, [location.pathname])

    useEffect(() => {
        const updateTitle = () => {
            if (location.pathname.startsWith('/@') && dataUser) {
                document.title = `${dataUser?.first_name} ${dataUser?.last_name} (@${dataUser?.nickname}) | TikTok`
            } else {
                document.title = '| TikTok'
            }
        }

        if (dataUser && dataUser?.first_name !== undefined && dataUser?.last_name !== undefined && dataUser?.nickname !== undefined) {
            updateTitle()
        }
    }, [location.pathname, dataUser])

    useEffect(() => {
        const apiFetch = async (page = 1) => {
            const results = await followService.getFollowingLists(page, localStorage.getItem('accessToken'))

            if (results && results.data.length > 0) {
                setFollowingLists(prev => [...prev, ...results.data])
            }

            if (followingLists.length <= results.meta.pagination.total && results.meta.pagination.current_page < results.meta.pagination.total_pages) {
                apiFetch(page + 1)
            }

            return results
        }
        apiFetch()
    }, [])

    return (
        <div className={cx('wrapper')}>
            {!dataUser ? (
                <div className={cx('error-container')}>
                    <div className={cx('error-lock')}>
                        <NoContent />
                    </div>

                    <div className={cx('error-title')}>
                        Couldn't find this account
                    </div>

                    <div className={cx('error-des')}>
                        Looking for videos? Try browsing our trending creators, hashtags, and sounds.
                    </div>
                </div>
            ) : (
                <>
                    <div className={cx('intro')}>
                        <div className={cx('share-info')}>
                            <Image
                                className={cx('avatar')}
                                src={dataUser?.avatar}
                                alt=' '
                            />

                            <div className={cx('share-title')}>
                                <h1 className={cx('title')}>
                                    {dataUser?.nickname}
                                    {dataUser?.tick && <TickLarge />}
                                </h1>
                                <h2 className={cx('sub-title')}>
                                    {dataUser?.first_name} {dataUser?.last_name}
                                </h2>
                                <div className={cx('btn')}>
                                    {/* {loggedInUserData.nickname === dataUser?.nickname ?
                                        (
                                            <div className={cx('btn-edit-profile')}>
                                                <Button text leftIcon={<EditIcon />}>
                                                    Edit Profile
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button primaryLonger>
                                                {dataUser?.is_followed ? 'Following' : 'Follow'}
                                            </Button>
                                        )
                                    } */}

                                    {/* {loggedInUserData ?
                                        (
                                            loggedInUserData.nickname === dataUser?.nickname ? (
                                                <div className={cx('btn-edit-profile')}>
                                                    <Button text leftIcon={<EditIcon />}>
                                                        Edit Profile
                                                    </Button>
                                                </div>
                                            ) : (
                                                true ? (
                                                    <div>
                                                        <Button outline>
                                                            Messages
                                                        </Button>

                                                        <div>
                                                            unfollow
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Button primaryLonger>
                                                            {false ? 'Following' : 'Follow'}
                                                        </Button>
                                                    </>
                                                )
                                            )
                                        ) : (
                                            <>
                                                <Button primaryLonger>
                                                    {false ? 'Following' : 'Follow'}
                                                </Button>
                                            </>
                                        )} */}

                                    {loggedInUserData ? (
                                        loggedInUserData.nickname === dataUser?.nickname ? (
                                            <div className={cx('btn-edit-profile')}>
                                                <Button text leftIcon={<EditIcon />}>
                                                    Edit Profile
                                                </Button>
                                            </div>
                                        ) : (
                                            followingLists.some(user => user.id === dataUser?.id) ? (
                                                <div>
                                                    <Button outline>
                                                        Messages
                                                    </Button>

                                                    <div>
                                                        Unfollow
                                                    </div>
                                                </div>
                                            ) : (
                                                <Button primaryLonger>
                                                    {dataUser?.is_followed ? 'Following' : 'Follow'}
                                                </Button>
                                            )
                                        )
                                    ) : (
                                        <Button primaryLonger>
                                            {dataUser?.is_followed ? 'Following' : 'Follow'}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className={cx('action')}>
                                <Tippy
                                    interactive={true}
                                    appendTo={document.body}
                                    render={attrs => (
                                        <PopperWrapper>
                                            <div className={cx('box')} tabIndex='-1' {...attrs}>
                                                <ShareGroup />
                                            </div>
                                        </PopperWrapper>
                                    )}
                                >
                                    <ShareIcon />
                                </Tippy>

                                <Tippy
                                    appendTo={document.body}
                                    interactive={true}
                                    render={attrs => (
                                        <PopperWrapper>
                                            <div className={cx('share-group')} tabIndex='-1' {...attrs}>
                                                <MoreAction />
                                            </div>
                                        </PopperWrapper>
                                    )}
                                >
                                    <MoreIconW />
                                </Tippy>
                            </div>
                        </div>

                        <div className={cx('count-info')}>
                            <div className={cx('following', 'count-info-number')}>
                                <strong title="Following">
                                    <ConvertData data={dataUser?.followings_count} />
                                </strong>
                                <span className={cx('unit')}>
                                    Following
                                </span>
                            </div>
                            <div className={cx('followers', 'count-info-number')}>
                                <strong title="Followers">
                                    <ConvertData data={dataUser?.followers_count} />
                                </strong>
                                <span className={cx('unit')}>
                                    Followers
                                </span>
                            </div>
                            <div className={cx('likes', 'count-info-number')}>
                                <strong title="Likes">
                                    <ConvertData data={dataUser?.likes_count} />
                                </strong>
                                <span className={cx('unit')}>
                                    Likes
                                </span>
                            </div>
                        </div>

                        <div className={cx('bio')}>
                            <p className={cx('bio-text')}>
                                {dataUser?.bio || 'No bio yet.'}
                            </p>

                            {dataUser?.website_url && (
                                <Link to={dataUser?.website_url} className={cx('link-bio')} target='_blank'>
                                    <LinkIcon />
                                    {dataUser?.website_url}
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className={cx('video')}>
                        <LayoutVideo />
                    </div>
                </>
            )}
        </div>
    )
}

export default Profile