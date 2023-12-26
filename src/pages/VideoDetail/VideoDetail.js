import classNames from "classnames/bind"
import ReactPlayer from "react-player"

import styles from './VideoDetail.module.scss'
import Button from "~/components/Button"
import { CloseIconBold, ReportMode } from '~/assets/icons'
import Search from '~/layouts/DefaultLayout/components/Search'
import Image from "~/components/Image"
import { Link } from "react-router-dom"

const cx = classNames.bind(styles)

function VideoDetail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video')}>
                <div className={cx('header')}>
                    <Button nomal>
                        <CloseIconBold />
                    </Button>

                    <div>
                        <Search />
                    </div>

                    <div>
                        <ReportMode />
                        report
                    </div>
                </div>

                <div className={cx('video__content')}>
                    <ReactPlayer
                        url='https://files.fullstack.edu.vn/f8-tiktok/videos/8-630268a08faa9.mp4'
                    >
                        x
                    </ReactPlayer>
                </div>

                <div className={cx('side-bar')}>

                </div>
            </div>

            <div className={cx('description')}>
                <div className={cx('des-header')}>
                    <div className={cx('header-container')}>
                        <div className={cx('profile-wrapper')}>
                            <div className={cx('pro-des')}>
                                <div className={cx('pro-des-info')}>
                                    <Link
                                        to='/@sondnf8pro'
                                    // className={cx('pro-des-info__link')}
                                    >
                                        <Image
                                            src='https://files.fullstack.edu.vn/f8-tiktok/users/11/630266fd71515.jpg'
                                            alt=' '
                                            className={cx('pro-des-info__avatar')}
                                        />

                                        <div className={cx('info-user')}>
                                            <div className={cx('pro-des-info__nickname')}>
                                                <span>sondnf8pro</span>
                                            </div>

                                            <div className={cx('pro-des-info__name')}>
                                                <span>Sơn Đặng</span>
                                                <span style={{ margin: '0px 4px' }}> · </span>
                                                <span>10-13</span>
                                            </div>
                                        </div>
                                    </Link>

                                    <Button primary>
                                        Follow
                                    </Button>
                                </div>

                                <div className={cx('pro-des-content')}>
                                    <div className={cx('main-content')}>
                                        Tóm tắt chuyện tình Việt - Nhật của tụi mình #couple #lovestory
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('tab-menu-wrapper')}>

                        </div>
                    </div>
                </div>

                <div className={cx('des-bottom')}>

                </div>
            </div>
        </div>
    )
}

export default VideoDetail