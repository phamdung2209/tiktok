import classNames from 'classnames/bind'
import { useState, useEffect, useCallback, useContext } from 'react'

import styles from './Sidebar.module.scss'
import config from '~/config'
import Menu, { MenuItem } from './Menu/'
import {
    HomeIcon,
    UserGrIcon,
    ExploreIcon,
    LiveIcon,
    HomeActiveIcon,
    UserGrActiveIcon,
    ExploreActiveIcon,
    LiveActiveIcon,
    UserNotLoginAvtiveIcon,
    UserNotLoginIcon
} from '~/assets/icons'
import SuggestAccounts from '~/components/SuggestAccounts'
import * as userService from '~/services/userService'
import Footer from './Footer'
import { UserLargeIcon } from '~/assets/icons'
import { UserContext } from '~/hooks/userContext'
import Image from '~/components/Image'
import images from '~/assets/images'
import Login from '../Login'

const cx = classNames.bind(styles)
const INIT_PAGE = 1
const PER_PAGE = 5

function Sidebar() {

    const [suggestedUser, setSuggestedUser] = useState([])
    const [pages, setPages] = useState(INIT_PAGE)
    const [isSee, setIsSee] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user, dataUser } = useContext(UserContext)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        setLoading(true)
        const apiSuggestedUser = async () => {
            setLoading(true)
            const results = await userService.getSuggestedUsers({ page: pages, perPage: PER_PAGE })
            // eslint-disable-next-line no-lone-blocks
            { isSee ? setSuggestedUser(prevData => [...prevData, ...results]) : setSuggestedUser(results) }
            setLoading(false)
        }

        apiSuggestedUser()
    }, [pages, isSee])

    const handleSeeUser = useCallback(() => {
        setIsSee(true)
        setPages(prevPage => prevPage + 1)
    }, [])

    const handleOpenModal = useCallback((e) => {
        setOpenModal(true)
        e.preventDefault()
    }, [])

    return (
        <aside className={cx('navbar')}>
            <Menu>
                <MenuItem activeIcon={<HomeActiveIcon />} icon={<HomeIcon />} title='For You' to={config.routes.home} />
                <MenuItem
                    activeIcon={user?.auth ? <UserGrActiveIcon /> : <UserNotLoginAvtiveIcon />}
                    icon={user?.auth ? <UserGrIcon /> : <UserNotLoginIcon />}
                    title='Following'
                    to={config.routes.folowing}
                />
                <MenuItem activeIcon={<ExploreActiveIcon />} icon={<ExploreIcon />} title='Explore' to={config.routes.explore} />
                <MenuItem activeIcon={<LiveActiveIcon />} icon={<LiveIcon />} title='LIVE' to={config.routes.live} />

                {user && user.auth ? (
                    <>
                        <MenuItem
                            activeIcon={<Image className={cx('avatar-nav')} src={dataUser.avatar ?? images.noBg} alt=' ' />}
                            icon={<Image className={cx('avatar-nav')} src={dataUser.avatar ?? images.noBg} alt=' ' />}
                            title='Profile'
                            to={`/@${dataUser.nickname}`}
                        />
                    </>
                ) : (
                    <>
                        <MenuItem icon={<UserLargeIcon />} title='Profile' to='/@' onClick={handleOpenModal} />
                        {openModal && <Login openModal={openModal} setOpenModal={setOpenModal} />}
                    </>
                )}
            </Menu>

            <SuggestAccounts label='Suggested accounts' data={suggestedUser} loading={loading} onSeeUser={handleSeeUser} />
            <SuggestAccounts label='Following accounts' />

            {/* Footer */}
            <Footer />
        </aside>
    )
}

export default Sidebar