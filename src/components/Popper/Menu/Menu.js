import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";
import PropTypes from 'prop-types';
import { useContext } from "react";

import styles from "./Menu.module.scss";
import { Wrapper as WapperPopper } from "../";
import MenuItem from "./MenuItem";
import Header from "./Header";
import { UserContext } from "~/hooks";

const cx = classNames.bind(styles);
const defaultFn = () => { }
function Menu({ children, menuItems = [], onChange = defaultFn }) {

    const [history, setHistory] = useState([{ data: menuItems }])
    const currentMenu = history[history.length - 1]

    const { logout } = useContext(UserContext)

    const RenderMenuItems = () => {
        return currentMenu.data.map((item, index) => {
            const isParent = !!item.children
            return (
                <MenuItem key={index} data={item} onClick={() => {
                    if (isParent) {
                        setHistory(prev => [...prev, item.children])
                    } else if (item.separate) {
                        logout()
                    }
                    else {
                        onChange(item)
                    }
                }} />
            )
        })
    }

    return (
        <Tippy
            hideOnClick={false}
            interactive={true}
            delay={[0, 800]}
            placement='bottom-end'
            render={attrs => (
                <div className={cx('content')} tabIndex='-1' {...attrs}>
                    <WapperPopper>
                        {history.length > 1 && <Header title={currentMenu.title} onBack={() => {
                            setHistory(prev => prev.splice(prev.length - 1, 1))
                        }} />}

                        <div className={cx('menu-scroll')}>
                            {RenderMenuItems()}
                        </div>
                    </WapperPopper>
                </div>
            )}
            onHidden={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    menuItems: PropTypes.array,
    onChange: PropTypes.func,
}

export default Menu;