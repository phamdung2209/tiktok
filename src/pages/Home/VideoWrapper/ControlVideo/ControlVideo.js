import classNames from 'classnames/bind'
import ReactPlayer from 'react-player'

import styles from './ControlVideo.module.scss'
import Button from '~/components/Button'
import { LikeLargeIcon, CommentLargeIcon, FlagLargeIcon, ShareLargeIcon } from '~/assets/icons'
import ConvertData from '~/components/ConvertData'

const cx = classNames.bind(styles)

function ControlVideo({ data }) {

    const ACTION_ITEMS = [
        {
            type: 'like',
            icon: <LikeLargeIcon />,
            count: <ConvertData data={data.likes_count} />
        },
        {
            type: 'comment',
            icon: <CommentLargeIcon />,
            count: <ConvertData data={data.comments_count} />
        },
        {
            type: 'flag',
            icon: <FlagLargeIcon />,
            count: <ConvertData data={data.shares_count} />
        },
        {
            type: 'share',
            icon: <ShareLargeIcon />,
            count: <ConvertData data={data.shares_count} />
        },
    ]

    return (
        data && (
            <div className={cx('wrapper')}>
                <div className={cx('video-card')}>
                    <ReactPlayer
                        url={data.file_url}
                        controls={false}
                        width='100%'
                        height='100%'
                        playing={false}
                        loop={true}
                        // muted={true}

                        config={{
                            file: {
                                attributes: {
                                    poster: data.thumb_url,
                                },
                            },
                        }}
                    />
                </div>

                <div className={cx('action')}>
                    {ACTION_ITEMS.map((item, index) => (
                        <div key={index} className={cx('action-item')}>
                            <div className={cx('action-icon')}>
                                <Button nomal>
                                    {item.icon}
                                </Button>
                            </div>
                            <div className={cx('action-count')}>
                                {item.count}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}

export default ControlVideo