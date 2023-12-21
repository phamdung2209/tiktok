import classNames from "classnames/bind"

import styles from './MoreAction.module.scss'
import { Report, Block } from '~/assets/icons'
import Button from "~/components/Button"

const cx = classNames.bind(styles)

const MORE_ACTION = [
    {
        title: 'Report',
        to: '/report',
        icon: <Report />
    },
    {
        title: 'Block',
        to: '/block',
        icon: <Block />
    }
]

function MoreAction() {
    return (
        <div className={cx('wrapper')}>
            {MORE_ACTION.map((item, index) => (
                <Button key={index} className={cx('more-action')} leftIcon={item.icon} to={item.to}>
                    {item.title}
                </Button>
            ))}
        </div>
    )
}

export default MoreAction;