import { forwardRef, useState } from 'react'
import classNames from 'classnames';

import images from '~/assets/images';
import styles from './Image.module.scss'

function Image({ src, className, fallBack = images.noImage, ...props }, ref) {
    const [error, setError] = useState('')
    const handleError = () => {
        setError(fallBack)
    }
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img className={classNames(styles.wrapper, className)} ref={ref} src={error || src} {...props} onError={handleError} />
    )
}

export default forwardRef(Image);