import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import styles from './VideoSetting.module.scss'
import { Wrapper as WrapperPopper } from '~/components/Popper'
import { MoreIconW } from '~/assets/icons'

const cx = classNames.bind(styles)
const VIDEO_SETTING = [
    {
        id: 1,
        title: 'Privacy Settings'
    },
    {
        id: 2,
        title: 'Delete',
        separate: true,
    }
]

function VideoSetting() {
    return (
        <div className={cx('wrapper')}>
            <Tippy
                hideOnClick={false}
                interactive={true}
                placement='bottom-end'
                offset={[0, -2]}
                delay={[0, 400]}
                appendTo={document.body}
                render={attrs => (
                    <div tabIndex="-1" {...attrs} className={cx('box')}>
                        <WrapperPopper>
                            <div className={cx('wapper-settings')}>
                                {VIDEO_SETTING.map((item, index) => (
                                    <div
                                        key={index}
                                        className={cx(
                                            'setting-title',
                                            { separate: item.separate }
                                        )}>
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        </WrapperPopper>
                    </div>
                )}
            >
                <div className={cx('video-setting')}>
                    <MoreIconW />
                </div>
            </Tippy>
        </div>
    )
}

export default VideoSetting;