import classNames from "classnames/bind"
import PropTypes from 'prop-types';

import styles from "./Menu.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Header({ title, onBack }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <h3 className={cx('header-title')}>{title}</h3>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
}

export default Header;