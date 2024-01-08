import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'

import styles from './Comment.module.scss'
import Image from '~/components/Image'
import { Like, Liked, MoreIconW, Tick, DeleteIcon, Flag } from '~/assets/icons'
import { FormattedDate } from '~/components/ConvertData/'
import * as videoService from '~/services/videoService'
import Tippy from '@tippyjs/react/headless'
import { Wrapper as WrapperPopper } from '~/components/Popper'
import AccountPreview from '~/components/SuggestAccounts/AccountPreview/AccountPreview'
import { UserContext } from '~/hooks/userContext'

const cx = classNames.bind(styles)

function Comment({ postComment, isDelete, setIsDelete }) {
    const [comments, setComments] = useState([])
    const [page, setPage] = useState(1)

    const accessToken = localStorage.getItem('accessToken')
    const location = useLocation()

    const { loggedInUserData } = useContext(UserContext)

    useEffect(() => {
        if (!accessToken) return
        const apiGetVideoComments = async () => {
            const results = await videoService.getVideoComments({ uuid: location.pathname.split('/')[3] }, page)

            if (results) {
                if (postComment) {
                    setComments([...results])
                } else {
                    setComments(results)
                }
            }
        }

        apiGetVideoComments()
    }, [location.pathname, postComment])


    const handleDeleteComment = (comment) => {
        const idComment = comment.id
        const apiDeleteComment = async () => {
            await videoService.deletePostComment(idComment)
            setComments(comments.filter((item) => item.id !== comment.id))
        }

        apiDeleteComment()

        setIsDelete(!isDelete)
    }
    const handleLikeComments = (comment) => {
        if (comment.is_liked) {
            const actionUnLike = async () => {
                const results = await videoService.actionUnLikeComments({ idComment: comment.id })

                if (results) {
                    setComments(
                        comments.map((item) => {
                            if (item.id === comment.id) {
                                return {
                                    ...item,
                                    is_liked: !item.is_liked,
                                    likes_count: item.is_liked ? item.likes_count - 1 : item.likes_count + 1,
                                }
                            }
                            return item
                        }),
                    )
                }
            }

            actionUnLike()
        } else {
            const actionLike = async () => {
                const results = await videoService.actionLikeComments({ idComment: comment.id })

                if (results) {
                    setComments(
                        comments.map((item) => {
                            if (item.id === comment.id) {
                                return {
                                    ...item,
                                    is_liked: !item.is_liked,
                                    likes_count: item.is_liked ? item.likes_count - 1 : item.likes_count + 1,
                                }
                            }
                            return item
                        }),
                    )
                }
            }

            actionLike()
        }
    }

    return (
        comments && (
            <div className={cx('wrapper')}>
                {comments.map((comment, index) => (
                    <div className={cx('container')} key={index}>
                        <div>
                            <Tippy
                                placement="bottom-start"
                                interactive={true}
                                delay={[800, 0]}
                                offset={[0, 50]}
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <WrapperPopper>
                                            <AccountPreview data={comment.user} />
                                        </WrapperPopper>
                                    </div>
                                )}
                            >
                                <Link to={`/@${comment.user.nickname}`} className={cx('--hover-user')}>
                                    <Image src={comment?.user?.avatar} alt=" " />
                                </Link>
                            </Tippy>
                        </div>

                        <div className={cx('content')}>
                            <div>
                                <Tippy
                                    placement="bottom-start"
                                    offset={[-52, 29]}
                                    interactive={true}
                                    delay={[800, 0]}
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <WrapperPopper>
                                                <AccountPreview data={comment.user} />
                                            </WrapperPopper>
                                        </div>
                                    )}
                                >
                                    <Link to={`/@${comment.user.nickname}`} className={cx('link-user')}>
                                        {`${comment.user.first_name} ${comment.user.last_name}`}
                                        {comment.user.tick && <Tick />}
                                    </Link>
                                </Tippy>
                            </div>

                            <div className={cx('content-comment')}>{comment.comment}</div>

                            <div className={cx('sub-content')}>
                                <div className={cx('time')}>
                                    <FormattedDate data={comment.created_at} />
                                </div>

                                <div className={cx('reply')}>Reply</div>
                            </div>
                        </div>

                        <div className={cx('action')}>
                            <Tippy
                                hideOnClick={false}
                                interactive={true}
                                delay={[100, 100]}
                                placement="bottom-end"
                                offset={[0, 0]}
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <WrapperPopper>
                                            <div className={cx('popper')}>
                                                <div className={cx('popper-item')}>
                                                    {comment.user.id === loggedInUserData.id ? (
                                                        <>
                                                            <DeleteIcon />
                                                            <span onClick={() => handleDeleteComment(comment)}>
                                                                Delete
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Flag />
                                                            <span
                                                            // onClick={() => handleDeleteComment(comment)}
                                                            >
                                                                Report
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </WrapperPopper>
                                    </div>
                                )}
                                appendTo={() => document.body}
                            >
                                <div className={cx('more')}>
                                    <MoreIconW />
                                </div>
                            </Tippy>

                            <div className={cx('liked')}>
                                <span onClick={() => handleLikeComments(comment)}>
                                    {comment && comment.is_liked ? <Liked /> : <Like />}
                                </span>
                                <span>{comment.likes_count}</span>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div >
        )
    )
}

export default Comment
