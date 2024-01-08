import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './VideoWrapper.module.scss'
import Button from '~/components/Button'
import { MusicIcon } from '~/assets/icons'
import ControlVideo from './ControlVideo'

const cx = classNames.bind(styles)

function VideoWrapper({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('info-text')}>
                    <Link to={`/@${data.user.nickname}`} className={cx('author')}>
                        <h3>{data.user.nickname}</h3>
                        <h4>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </Link>

                    <div className={cx('info-des')}>
                        <div className=''>
                            {data.description}
                        </div>
                    </div>

                    <div className={cx('info-sound')}>
                        <div className={cx('video-music')}>
                            <Link to='#'>
                                <MusicIcon />
                                <div>
                                    original sound -{' '}
                                    {data.music ? data.music : `${data.user.first_name} ${data.user.last_name}`}
                                </div>
                            </Link>
                        </div>

                        <div className={cx('anchor-tag')}>

                        </div>
                    </div>
                </div>

                <div className={cx('info-btn')}>
                    {data.user.is_followed && (
                        <Button dark>
                            Following
                        </Button>
                    )}

                    {!data.user.is_followed && (
                        <Button outline>
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