import { forwardRef, useEffect, useState } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';

import images from '~/assets/images';
import styles from './Image.module.scss'

const Image = forwardRef(({ src, className, fallBack = images.noImage, ...props }, ref) => {
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
    }, [src])

    const handleError = () => {
        setError(fallBack)
    }
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref} src={error || src}
            {...props} onError={handleError}
        />
    )
}
)

Image.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
}

export default Image