import { Menu as MenuPopper } from '~/components/Popper'
import Image from '~/components/Image';
import images from '~/assets/images';
import { MoreIcon } from '~/assets/icons'
import classNames from 'classnames/bind';
import styles from './UserItems.module.scss';

const cx = classNames.bind(styles)

function UserItems({ USER_ITEMS, user, dataUser, currentUser, handleMenuChange }) {
    return (
        <MenuPopper menuItems={USER_ITEMS} currentUser={currentUser} onChange={handleMenuChange}>
            {user && currentUser ? (
                <Image
                    className={cx('user-avatar')}
                    src={dataUser.avatar ?? images.noBg}
                    alt=' '
                // fallBack='https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/271605415_1614588432227494_1107124473320678271_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=11e7ab&_nc_eui2=AeFdkF5uqgTP9D2hHn2D87EU_KdI4N38JtD8p0jg3fwm0Oy5LQMKdxg3pLPekX_9MhkAbjLPOQDNDgyIH6EPbuxm&_nc_ohc=eR8gD2V7Cl0AX_wL49A&_nc_ht=scontent.fhan14-2.fna&oh=00_AfBgKYQFkZ3yj4qrreSPvT4grLqPWCpIpmc4_ubXPsvmRQ&oe=65813C8D'
                />
            ) : (
                <button className={cx('more-btn')}>
                    <MoreIcon />
                </button>
            )}
        </MenuPopper>
    )
}

export default UserItems;