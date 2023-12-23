import classNames from "classnames/bind"

import styles from './VideoDetail.module.scss'
import Button from "~/components/Button"

const cx = classNames.bind(styles)

function VideoDetail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video')}>
                <div>
                    <div>
                        <Button nomal>
                            Report
                        </Button>
                        <Button nomal>
                            &times;
                        </Button>
                    </div>

                    <div>
                        Search
                    </div>

                    <div>
                        report
                    </div>
                </div>
            </div>

            <div className={cx('description')}>

            </div>
        </div>
    )
}

export default VideoDetail