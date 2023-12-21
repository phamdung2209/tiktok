import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react/headless'

import style from './Profile.module.scss'
import Image from '~/components/Image'
import { TickLarge, LinkIcon } from '~/assets/icons'
import Button from '~/components/Button'
import { ShareIcon, MoreIconW } from '~/assets/icons'
import LayoutVideo from './NavVideo'
import * as videoService from '~/services/videoService'
import ConvertData from '~/components/ConvertData'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import ShareGroup from './ShareGroup'
import MoreAction from './MoreAction'

const cx = classNames.bind(style)

function Profile() {

    // const [dataVideo, setDataVideo] = useState([])
    const [dataUser, setDataUser] = useState({})

    useEffect(() => {
        const apiGetUserVideo = async () => {
            const results = await videoService.getUserVideos({ username: window.location.pathname })
            setDataUser(results)
            // setDataVideo([...results.videos])
        }

        apiGetUserVideo()
    }, [])


    return (
        <div className={cx('wrapper')}>
            <div className={cx('intro')}>
                <div className={cx('share-info')}>
                    <Image
                        className={cx('avatar')}
                        src={dataUser.avatar}
                        alt=' '
                    />

                    <div className={cx('share-title')}>
                        <h1 className={cx('title')}>
                            {dataUser.nickname}
                            {dataUser.tick && <TickLarge />}
                        </h1>
                        <h2 className={cx('sub-title')}>
                            {dataUser.first_name} {dataUser.last_name}
                        </h2>
                        <div className={cx('btn')}>
                            <Button primaryLonger >
                                {dataUser.is_followed ? 'Following' : 'Follow'}
                            </Button>
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
                            <ConvertData data={dataUser.followings_count} />
                        </strong>
                        <span className={cx('unit')}>
                            Following
                        </span>
                    </div>
                    <div className={cx('followers', 'count-info-number')}>
                        <strong title="Followers">
                            <ConvertData data={dataUser.followers_count} />
                        </strong>
                        <span className={cx('unit')}>
                            Followers
                        </span>
                    </div>
                    <div className={cx('likes', 'count-info-number')}>
                        <strong title="Likes">
                            <ConvertData data={dataUser.likes_count} />
                        </strong>
                        <span className={cx('unit')}>
                            Likes
                        </span>
                    </div>
                </div>

                <div className={cx('bio')}>
                    <p className={cx('bio-text')}>
                        {dataUser.bio}
                    </p>

                    {dataUser.website_url && (
                        <Link to={dataUser.website_url} className={cx('link-bio')} target='_blank'>
                            <LinkIcon />
                            {dataUser.website_url}
                        </Link>
                    )}
                </div>
            </div>

            <div className={cx('video')}>
                <LayoutVideo />
            </div>
        </div>
    )
}

export default Profile;