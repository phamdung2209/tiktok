import classNames from "classnames/bind"
import PropTypes from 'prop-types';

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function Menu({ children }) {
    return (
        <nav className={cx('wrapper')}>
            {children}
        </nav>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired
}

export default Menu;