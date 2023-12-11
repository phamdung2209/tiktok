import { Link } from "react-router-dom"
import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react'
import { useEffect, useRef } from "react"

import styles from './Button.module.scss'
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

function Button({ to, href, children, onClick, primary, outline, small, large, text, disabled, rounded, ...passProps }) {
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
        rounded
    })

    return (
        <Tippy content={buttonRef.current?.textContent}>
            <Comp className={classes} {...props}>
                <span ref={buttonRef}>{children}</span>
            </Comp>
        </Tippy>
    )
}

export default Button