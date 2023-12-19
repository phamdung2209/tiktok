import classNames from 'classnames/bind'
import { useState, useEffect, useCallback } from 'react';

import styles from './Sidebar.module.scss'
import config from '~/config'
import Menu, { MenuItem } from './Menu/';
import { HomeIcon, UserGrIcon, ExploreIcon, LiveIcon, HomeActiveIcon, UserGrActiveIcon, ExploreActiveIcon, LiveActiveIcon } from '~/assets/icons'
import SuggestAccounts from '~/components/SuggestAccounts';
import * as userService from '~/services/userService'
import LoadingSuggestAccount from '~/components/SuggestAccounts/LoadingSuggestAccount'
import Footer from './Footer';

const cx = classNames.bind(styles)
const INIT_PAGE = 1
const PER_PAGE = 5

function Sidebar() {

    const [suggestedUser, setSuggestedUser] = useState([])
    const [followingUser, setFollowingUser] = useState([])
    const [pages, setPages] = useState(INIT_PAGE)
    const [isSee, setIsSee] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const apiSuggestedUser = async () => {
            setLoading(true)
            const results = await userService.getSuggestedUsers({ page: pages, perPage: PER_PAGE })
            // eslint-disable-next-line no-lone-blocks
            { isSee ? setSuggestedUser(prevData => [...prevData, ...results]) : setSuggestedUser(results) }
            setLoading(false)
        }

        // const apiFollowingUser = async () => {
        //     const results = await userService.getFollowingUsers({ page: 1 })
        //     setFollowingUser(results)
        // }

        apiSuggestedUser()
        // apiFollowingUser()
    }, [pages, isSee])

    const handleSeeUser = useCallback(() => {
        setIsSee(true)
        setPages(prevPage => prevPage + 1)
    }, [])

    return (
        <aside className={cx('navbar')}>
            <Menu>
                <MenuItem activeIcon={<HomeActiveIcon />} icon={<HomeIcon />} title='For You' to={config.routes.home} />
                <MenuItem activeIcon={<UserGrActiveIcon />} icon={<UserGrIcon />} title='Following' to={config.routes.folowing} />
                <MenuItem activeIcon={<ExploreActiveIcon />} icon={<ExploreIcon />} title='Explore' to={config.routes.explore} />
                <MenuItem activeIcon={<LiveActiveIcon />} icon={<LiveIcon />} title='LIVE' to={config.routes.live} />
                {/* <MenuItem icon={<P/>} title='Profile' to={config.routes.profile} /> */}
            </Menu>

            <SuggestAccounts label='Suggested accounts' data={suggestedUser} loading={loading} onSeeUser={handleSeeUser} />
            <SuggestAccounts label='Following accounts' />

            {/* Footer */}
            <Footer />
        </aside>
    )
}

export default Sidebar;