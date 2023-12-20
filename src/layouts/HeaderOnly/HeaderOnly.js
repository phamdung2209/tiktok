import PropTypes from 'prop-types';

import Header from '../DefaultLayout/components/Header'

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className='container'>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {
    children: PropTypes.node
}

export default HeaderOnly;