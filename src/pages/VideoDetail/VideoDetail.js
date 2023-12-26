import classNames from "classnames/bind"
import ReactPlayer from "react-player"

import styles from './VideoDetail.module.scss'
import Button from "~/components/Button"
import { CloseIconBold, ReportMode } from '~/assets/icons'
import Search from '~/layouts/DefaultLayout/components/Search'

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

                    >
                        x
                    </ReactPlayer>
                </div>

                <div className={cx('side-bar')}>

                </div>
            </div>

            <div className={cx('description')}>

            </div>
        </div>
    )
}

export default VideoDetail