import classNames from "classnames/bind"
import PropTypes from 'prop-types';

import styles from './AccountPreview.module.scss'
import Image from "~/components/Image"
import Button from "~/components/Button"
import { Tick } from "~/assets/icons"

const cx = classNames.bind(styles)

function AccountPreview({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('account-title', 'disFlex')}>
                <Image className={cx('avatar')} src={`${data.avatar}`} alt={`${data.nickname}`} />
                <Button primary>Follow</Button>
            </div>

            <div className={cx('account-info')}>
                <div className={cx('nickname')}>
                    <strong>{`${data.nickname}`}</strong>
                    <Tick />
                </div>
                <div className={cx('name')}>
                    {`${data.first_name} ${data.last_name}`}
                </div>
            </div>

            <div className={cx('follow-info', 'disFlex')}>
                <div className={cx('follow')}>
                    <strong>{
                        data.followers_count >= 1000 ? `${(data.followers_count / 1000).toFixed(1)}K` : data.followers_count >= 1000000 ? `${(data.followers_count / 1000000).toFixed(1)}M` : data.followers_count >= 1000000000 ? `${(data.followers_count / 1000000000).toFixed(1)}B` : data.followers_count
                    }</strong>
                    <span className={cx('label-color')}> Followers</span>
                </div>
                <div className={cx('like')}>
                    <strong>{
                        data.likes_count >= 1000 ? `${(data.likes_count / 1000).toFixed(1)}K` : data.likes_count >= 1000000 ? `${(data.likes_count / 1000000).toFixed(1)}M` : data.likes_count >= 1000000000 ? `${(data.likes_count / 1000000000).toFixed(1)}B` : data.likes_count
                    }</strong>
                    <span className={cx('label-color')}> Likes</span>
                </div>
            </div>
        </div>
    )
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired
}

export default AccountPreview;