import classNames from "classnames/bind"
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function MenuItem({ icon, title, to, activeIcon }) {

    return (
        <NavLink to={to} className={nav => cx('menuItem', { active: nav.isActive })}>
            <span className={cx('icon-notActive', 'icon')}>
                {icon}
            </span>
            <span className={cx('icon-active', 'icon')}>
                {activeIcon}
            </span>
            <div className={cx('title')}>{title}</div>
        </NavLink>
    )
}

MenuItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
}

export default MenuItem;