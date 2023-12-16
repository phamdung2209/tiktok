import { Link } from "react-router-dom"
import 'tippy.js/dist/tippy.css'
import { useRef } from "react"
import PropTypes from 'prop-types'

import styles from './Button.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    children,
    onClick,
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    leftIcon,
    rightIcon,
    ...passProps }) {
    const buttonRef = useRef()
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps
    }

    if (disabled) {
        Object.keys(props).forEach(key => {
            // if (key.startsWith('on')) {
            props[key] = e => e.preventDefault()
            // }
        })

        props.tabIndex = -1
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
    })

    return (
        // <Tippy content={buttonRef.current?.textContent}>
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span ref={buttonRef} className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
        // </Tippy>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
}

export default Button