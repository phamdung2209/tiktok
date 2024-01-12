import classNames from 'classnames/bind'
import { useState, useEffect, useCallback, useContext } from 'react'
import ReactDOM from 'react-dom'

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
    const [pagesControl, setPagesControl] = useState({
        page: INIT_PAGE,
        totalPage: 52,
        renderedPages: [],
    })
    const [loading, setLoading] = useState(false)
    const { user, loggedInUserData } = useContext(UserContext)
    const [openModal, setOpenModal] = useState(false)


    const getRandomPage = () => {
        let randomPage = Math.floor(Math.random() * pagesControl.totalPage) + 1
        if (pagesControl.renderedPages.includes(randomPage)) {
            return getRandomPage()
        }

        return randomPage
    }

    useEffect(() => {
        const apiSuggestedUser = async () => {
            const resultsRandom = await userService.getSuggestedUsers({ page: pagesControl.page, perPage: PER_PAGE })

            setPagesControl((prev) => ({
                ...prev,
                totalPage: resultsRandom.meta.pagination.total_pages,
            }))
        }

        apiSuggestedUser()
    }, [])

    useEffect(() => {
        setLoading(true)

        const randomPage = getRandomPage()

        const apiSuggestedUser = async () => {
            try {
                const results = await userService.getSuggestedUsers({ page: randomPage, perPage: PER_PAGE })

                setPagesControl((prev) => ({
                    ...prev,
                    renderedPages: [...prev.renderedPages, randomPage],
                }))

                setSuggestedUser((prevData) => [...prevData, ...results.data])

                setLoading(false)
            } catch (error) {
                console.error('Error fetching suggested users:', error)
                setLoading(false)
            }
        }

        apiSuggestedUser()
    }, [pagesControl.page])


    const handleSeeUser = useCallback(() => {
        setPagesControl(prev => ({
            ...prev,
            page: getRandomPage()
        }))
    }, [])

    const handleOpenModal = useCallback((e) => {
        setOpenModal(true)
        e.preventDefault()
    }, [])

    return (
        pagesControl && pagesControl.renderedPages.length > 0 && (
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
                                activeIcon={<Image className={cx('avatar-nav')} src={loggedInUserData.avatar ?? images.noBg} alt=' ' />}
                                icon={<Image className={cx('avatar-nav')} src={loggedInUserData.avatar ?? images.noBg} alt=' ' />}
                                title='Profile'
                                to={`/@${loggedInUserData.nickname}`}
                            />
                        </>
                    ) : (
                        <>
                            <MenuItem icon={<UserLargeIcon />} title='Profile' to='/@' onClick={handleOpenModal} />
                            {/* {openModal && <Login openModal={openModal} setOpenModal={setOpenModal} />} */}
                            {openModal && ReactDOM.createPortal(<Login setOpenModal={setOpenModal} />, document.body)}
                        </>
                    )}
                </Menu>

                <SuggestAccounts pagesControl={pagesControl} label='Suggested accounts' data={suggestedUser} loading={loading} onSeeUser={handleSeeUser} />

                <SuggestAccounts label='Following accounts' />

                {/* Footer */}
                <Footer />
            </aside>
        )
    )
}

export default Sidebar