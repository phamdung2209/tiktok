import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { memo } from 'react';

import styles from './SuggestAccounts.module.scss';
import AccountItem from "./AccountItem";
import LoadingSuggestAccount from "./LoadingSuggestAccount";

const cx = classNames.bind(styles);

function SuggestAccounts({ label, data = [], onSeeUser, loading }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('label')}>
                {label}
            </h2>

            {data.map((account, index) => (
                <AccountItem key={index} to={`/@${account.nickname}`} data={account} />
            ))}

            {loading && <LoadingSuggestAccount />}


            <button className={cx('see-more')} onClick={onSeeUser}>
                See more
            </button>
        </div>
    )
}

SuggestAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array
}

export default memo(SuggestAccounts);