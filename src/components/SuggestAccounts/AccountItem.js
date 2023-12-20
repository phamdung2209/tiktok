import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import PropTypes from 'prop-types';

import styles from './SuggestAccounts.module.scss'
import Image from '../Image'
import { Tick } from '~/assets/icons'
import { Wrapper as PopperWrapper } from '../Popper'
import AccountPreview from './AccountPreview'

const cx = classNames.bind(styles)

function AccountItem({ to, data = [] }) {
    return (
        <Tippy
            interactive={true}
            delay={[800, 0]}
            placement='top-end'
            render={attrs => (
                <div className={cx('box')} tabIndex='-1' {...attrs}>
                    <PopperWrapper >
                        <AccountPreview data={data} />
                    </PopperWrapper>
                </div>
            )}
            appendTo={() => document.body}
        >
            <Link to={to} className={cx('account-item')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <div className={cx('account-info')}>
                    <div className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                        {data.tick && <Tick />}
                    </div>
                    <div className={cx('name')}>
                        {`${data.first_name} ${data.last_name}`}
                    </div>
                </div>
            </Link>
        </Tippy>
    )
}

AccountItem.propTypes = {
    to: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}

export default AccountItem;