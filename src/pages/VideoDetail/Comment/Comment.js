import classNames from 'classnames/bind'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useContext, useRef, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'

import styles from './Comment.module.scss'
import Image from '~/components/Image'
import { Like, Liked, MoreIconW, Tick, DeleteIcon, Flag } from '~/assets/icons'
import { FormattedDate } from '~/components/ConvertData/'
import * as videoService from '~/services/videoService'
import Tippy from '@tippyjs/react/headless'
import { Wrapper as WrapperPopper } from '~/components/Popper'
import AccountPreview from '~/components/SuggestAccounts/AccountPreview/AccountPreview'
import { UserContext } from '~/hooks/userContext'
import LoadingWrapper from '~/components/LoadingWrapper'
import Confirm from '~/components/Confirm'
import ToastMessage from '~/components/ToastMessage'

const cx = classNames.bind(styles)
const options = {
    title: 'Delete Comment',
    content: 'Are you sure you want to delete this comment?',
    action: 'Delete',
    cancel: 'Cancel',
    onConfirm: () => {},
}

function Comment({ postComment, isDelete, setIsDelete, data, ...props }) {
    const [comments, setComments] = useState([])
    const [action, setAction] = useState({
        showBtn: true,
        hasMore: true,
        showComfirm: false,
        showMessage: false,
    })

    const accessToken = localStorage.getItem('accessToken')
    const location = useLocation()

    const { loggedInUserData, user } = useContext(UserContext)

    const handleDeleteComment = (comment) => {
        const idComment = comment.id
        const apiDeleteComment = async () => {
            await videoService.deletePostComment(idComment)
            setComments(comments.filter((item) => item.id !== comment.id))
        }

        apiDeleteComment()

        setIsDelete(!isDelete)
        setAction({
            ...action,
            showBtn: false,
        })
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

    // test
    const loadingRef = useRef(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const onIntersect = (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore) {
            getMoreComments()
        }
    }

    const [isFirstLoad, setIsFirstLoad] = useState(true)

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false)
            return
        }
        setComments([])
        setPage(1)
        setHasMore(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, accessToken])

    useLayoutEffect(() => {
        if (Object.keys(postComment).length !== 0) setComments((prev) => [postComment, ...prev])
    }, [postComment])

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect)

        if (observer && loadingRef.current) {
            observer.observe(loadingRef.current)
        }

        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comments])

    async function getMoreComments() {
        if (comments.length === data.comments_count) {
            setHasMore(false)
            return
        }

        try {
            const results = await videoService.getVideoComments({ uuid: data.uuid }, page)

            if (results.data.length === 0) {
                setHasMore(false)
            } else {
                setComments((prev) => [...prev, ...results.data])
                setPage(page + 1)
            }
        } catch (err) {
            console.log(err)
        }
    }
    // end

    return (
        comments &&
        (user.auth ? (
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
                                <Link to={`/@${comment.user?.nickname}`} className={cx('--hover-user')}>
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
                                    <Link to={`/@${comment.user?.nickname}`}>
                                        <div className={cx('link-user')}>
                                            {`${comment.user?.first_name} ${comment.user?.last_name}`}
                                            {comment.user?.tick && <Tick />}
                                        </div>
                                        {data?.user?.nickname === comment.user?.nickname && (
                                            <div className="div--notUnderline">
                                                <span style={{ margin: '0px 4px' }}>·</span>
                                                <span
                                                    style={{
                                                        fontSize: '1.4rem',
                                                        color: 'rgb(255, 59, 92)',
                                                        fontWeight: 400,
                                                    }}
                                                >
                                                    Creator
                                                </span>
                                            </div>
                                        )}
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
                                onHide={() => {
                                    setAction({
                                        ...action,
                                        showBtn: true,
                                    })
                                }}
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        {action.showBtn && (
                                            <WrapperPopper>
                                                <div className={cx('popper')}>
                                                    <div className={cx('popper-item')}>
                                                        {comment.user.id === loggedInUserData.id ? (
                                                            <span
                                                                onClick={() => {
                                                                    setAction({
                                                                        ...action,
                                                                        showComfirm: true,
                                                                    })

                                                                    options.onConfirm = () => {
                                                                        handleDeleteComment(comment)

                                                                        setTimeout(() => {
                                                                            setAction({
                                                                                ...action,
                                                                                showMessage: false,
                                                                            })
                                                                        }, 5000)
                                                                    }
                                                                }}
                                                                style={{ display: 'flex', alignItems: 'center' }}
                                                            >
                                                                <DeleteIcon />
                                                                <span>Delete</span>
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <Flag />
                                                                <span>Report</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </WrapperPopper>
                                        )}
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
                ))}

                {hasMore && comments && (
                    <div ref={loadingRef}>
                        <LoadingWrapper />
                    </div>
                )}

                {action.showComfirm &&
                    ReactDOM.createPortal(
                        <Confirm action={action} setAction={setAction} options={options} />,
                        document.body,
                    )}

                {action.showMessage && ReactDOM.createPortal(<ToastMessage message="Deleted" />, document.body)}
            </div>
        ) : (
            <div className={cx('no-data')}>Log in to like or comment!</div>
        ))
    )
}

export default Comment
