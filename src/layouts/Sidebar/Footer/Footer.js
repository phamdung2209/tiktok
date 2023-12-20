import classNames from "classnames/bind"
import { Link } from "react-router-dom"

import styles from "./Footer.module.scss"
import config from "~/config"
import { EffectIcon } from '~/assets/icons'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('footer-banner')}>
                <Link to={config.routes.home} className={cx('btn')}>
                    <EffectIcon className={cx('btn-icon')} />
                    <h4>Create effects</h4>
                </Link>
            </div>

            <div className={cx('copy-right')}>
                © 2023 TikTok
            </div>
        </footer>
    )
}

export default Footer;