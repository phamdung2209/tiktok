import { Link } from 'react-router-dom'
import 'tippy.js/dist/tippy.css'
import { useRef, forwardRef } from 'react'

import styles from './Button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Button(
    {
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
        primaryLonger,
        nomal,
        dark,
        ...passProps
    },
    ref,
) {
    const buttonRef = useRef()
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps,
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            // if (key.startsWith('on')) {
            props[key] = (e) => e.preventDefault()
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
        primaryLonger,
        nomal,
        dark,
    })

    return (
        <Comp ref={ref} className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span ref={buttonRef} className={cx('title')}>
                {children}
            </span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    )
}

export default forwardRef(Button)
