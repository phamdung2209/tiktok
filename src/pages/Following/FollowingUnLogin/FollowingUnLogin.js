import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'

import styles from './FollowingUnLogin.module.scss'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { TickSmall } from '~/assets/icons'
import * as userService from '~/services/userService'
import * as followService from '~/services/followService'
import LoadingWrapper from '~/components/LoadingWrapper'
import Login from '~/layouts/Login'
import { UserContext } from '~/hooks/userContext'

const cx = classNames.bind(styles)

function FollowingUnLogin() {
    const [data, setData] = useState([])
    const [videoControl, setVideoControl] = useState({
        playing: 0,
        isLoading: false,
    })
    const [openModal, setOpenModal] = useState(false)

    const playerRef = useRef([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        const apiSuggestedUser = async () => {
            setVideoControl({
                ...videoControl,
                isLoading: true,
            })

            let INIT_PAGE = 1
            const PER_PAGE = 20
            let newData = []
            while (newData.length <= 50) {
                const resultsRandom = await userService.getSuggestedUsers({ page: INIT_PAGE, perPage: PER_PAGE })

                for (const user of resultsRandom.data) {
                    if (user.tick) {
                        newData.push(user)
                    }

                    if (newData.length === 6) {
                        break
                    }
                }

                INIT_PAGE++

                if (resultsRandom.data.length === 0) {
                    break
                }
            }
            setData(newData)

            setVideoControl({
                ...videoControl,
                isLoading: false,
            })
        }
        apiSuggestedUser()
    }, [])

    const handleBtnFollow = (idUser) => {
        if (user.auth) {
            const followUser = async ({ idUser }) => {
                const results = await followService.followUser({ idUser })

                if (results) {
                    setData(
                        data.map((item) => {
                            if (item.id === idUser) {
                                return {
                                    ...item,
                                    followed: true,
                                }
                            }

                            return item
                        }),
                    )
                }
            }

            followUser({ idUser })
        } else {
            setOpenModal(!openModal)
        }
    }

    const handleBtnUnFollow = (idUser) => {
        const unFollowUser = async ({ idUser }) => {
            const results = await followService.unfollowUser({ idUser })

            if (results) {
                setData(
                    data.map((item) => {
                        if (item.id === idUser) {
                            return {
                                ...item,
                                followed: false,
                            }
                        }

                        return item
                    }),
                )
            }
        }

        unFollowUser({ idUser })
    }

    return videoControl.isLoading ? (
        <LoadingWrapper />
    ) : (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={cx('user-card')}
                        onMouseEnter={() => {
                            setVideoControl({
                                ...videoControl,
                                playing: index,
                            })
                        }}
                    >
                        <Link to={`/@${item.nickname}`} target="_blank">
                            <div className={cx('video')}>
                                <ReactPlayer
                                    ref={(ref) => (playerRef[index] = ref)}
                                    url={item.popular_video.file_url}
                                    muted={true}
                                    playing={videoControl.playing === index}
                                    loop={true}
                                    onPause={() => playerRef[index]?.getInternalPlayer()?.load()}
                                    config={{
                                        file: {
                                            attributes: {
                                                poster: item.popular_video.thumb_url,
                                            },
                                        },
                                    }}
                                />
                            </div>

                            <div className={cx('info')}>
                                <div className={cx('avatar')}>
                                    <Image src={item.avatar} alt=" " />
                                </div>

                                <h3>
                                    {item.first_name} {item.last_name}
                                </h3>

                                <h4>
                                    <span>{item.nickname}</span>
                                    {item.tick && <TickSmall />}
                                </h4>

                                <div className={cx('btn-follow')} onClick={(e) => e.preventDefault()}>
                                    {item.followed ? (
                                        <Button outline onClick={() => handleBtnUnFollow(item.id)}>
                                            Following
                                        </Button>
                                    ) : (
                                        <Button primary onClick={() => handleBtnFollow(item.id)}>
                                            Follow
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {openModal && ReactDOM.createPortal(<Login setOpenModal={setOpenModal} />, document.body)}
        </div>
    )
}

export default FollowingUnLogin
