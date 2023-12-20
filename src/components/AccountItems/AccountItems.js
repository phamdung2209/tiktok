import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import styles from "./AccountItems.module.scss";
import Image from "../Image";
import { Tick } from "~/assets/icons";

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <div className={cx('account-avatar')}>
                <Image
                    className={cx('avatar')}
                    src={data.avatar}
                    alt={data.full_name} />
            </div>

            <div className={cx('account-info')}>
                <div className={cx('account-name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <Tick className={cx('account-iconCheck')} />}
                </div>
                <div className={cx('account-username')}>
                    <span>{data.nickname}</span>
                </div>
            </div>
        </Link>
    )
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default AccountItem;