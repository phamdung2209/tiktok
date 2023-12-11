import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import styles from "./AccountItems.module.scss";

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('account-avatar')}>
                <img className={cx('avatar')} src='https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/271605415_1614588432227494_1107124473320678271_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=11e7ab&_nc_ohc=g5ttcOwSkAYAX9_nscZ&_nc_ht=scontent.fhan14-2.fna&oh=00_AfBtb-4dbrs1INiMev8qqic0YyDPLKXh1r44IzXZAiBgCw&oe=657B4DCD' alt='avatar' />
            </div>

            <div className={cx('account-info')}>
                <div className={cx('account-name')}>
                    <span>SmileEveryDay</span>
                    <FontAwesomeIcon className={cx('account-iconCheck')} icon={faCheckCircle} />
                </div>
                <div className={cx('account-username')}>
                    <span>@nguyenvana</span>
                </div>
            </div>
        </div>
    )
}

export default AccountItem;