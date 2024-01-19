import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './HighlightedText.module.scss'

const cx = classNames.bind(styles)

function HighlightedText({ data }) {
    const parts = String(data).split(/(#\S+)/g).map((part, index) => {
        if (part.startsWith('#')) {
            const tag = part.substring(1)
            return <Link key={index} to={`/tag/${tag}`} className={cx('highlighted')}>{part}</Link>
        }
        return <span key={index}>{part}</span>
    })

    return (
        <div className={cx('wrapper')}>
            {parts}
        </div>
    )
}

export default HighlightedText

