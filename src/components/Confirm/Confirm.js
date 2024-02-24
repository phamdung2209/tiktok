import classNames from 'classnames/bind'

import styles from './Confirm.module.scss'
import Modal from '~/components/Modal'

const cx = classNames.bind(styles)

function Confirm({ options, setAction, action }) {
    return (
        <div className={cx('wrapper')}>
            <Modal>
                <div className={cx('container')}>
                    <div className={cx('title')}>{options.content}</div>

                    <div className={cx('btn-options')}>
                        <button
                            style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontWeight: 500,
                            }}
                            onClick={() => {
                                options.onConfirm()
                                setAction({
                                    ...action,
                                    showComfirm: false,
                                    showMessage: true,
                                })
                            }}
                        >
                            {options.action}
                        </button>
                        <button
                            style={{
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontWeight: 400,
                            }}
                            onClick={() =>
                                setAction({
                                    ...action,
                                    showComfirm: false,
                                })
                            }
                        >
                            {options.cancel}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Confirm
