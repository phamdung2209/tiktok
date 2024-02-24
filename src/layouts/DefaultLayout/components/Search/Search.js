import { useEffect, useState, useRef } from 'react'
import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'

import * as searchService from '~/services/searchService'
import { Wrapper as WapperPopper } from '~/components/Popper'
import AccountItem from '~/components/AccountItems'
import useDebounce from '~/hooks'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
    const [searchResults, setSearchResults] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [searchShow, setSearchShow] = useState(true)
    const [loading, setLoading] = useState(false)
    const debounce = useDebounce(searchValue, 600)

    const searchRef = useRef()

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResults([])
            return
        }

        setLoading(true)

        // custom request
        const fetchApi = async () => {
            setLoading(true)
            const results = await searchService.search(debounce)
            setSearchResults(results)
            setLoading(false)
        }

        fetchApi()
    }, [debounce])

    const handleClickOutside = () => {
        setSearchShow(false)
    }

    const handleClear = (e) => {
        setSearchValue('')
        setSearchResults([])
        searchRef.current.focus()
    }

    // handle change search
    const handleChangeSearch = (e) => {
        const value = e.target.value
        if (!value.startsWith(' ')) {
            setSearchValue(e.target.value)
        }
    }

    return (
        <Tippy
            appendTo={document.body}
            interactive={true}
            visible={searchShow && searchResults.length > 0}
            render={(attrs) => (
                <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                    <WapperPopper>
                        <div>abc</div>
                        <label className={cx('search-label')}>Accounts</label>
                        {searchResults.map((data) => (
                            <AccountItem key={data.id} data={data} />
                        ))}
                    </WapperPopper>
                </div>
            )}
            onClickOutside={handleClickOutside}
        >
            <div className={cx('search')}>
                <input
                    ref={searchRef}
                    value={searchValue}
                    type="text"
                    placeholder="Search"
                    spellCheck={false}
                    onChange={handleChangeSearch}
                    onFocus={() => setSearchShow(true)}
                />

                {!!searchValue && !loading && (
                    <button className={cx('close')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </Tippy>
    )
}

export default Search
