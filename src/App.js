import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
import { animateScroll as scroll, Link } from 'react-scroll'

import { publicRoutes } from '~/routes'
import DefaultLayout from './layouts'
import { GoToTop } from '~/assets/icons'

function App() {
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.pageYOffset > 100)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Router>
        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Page = route.component

              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return <Route key={index} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            })
          }
        </Routes>
      </Router>


      <div className={`bottom-container ${isScrolling ? 'tran' : ''}`}>
        <div className='get-app'>
          <button className='btn-get-app'>
            Get App
          </button>
        </div>
        <button
          onClick={() => {
            scroll.scrollToTop({
              duration: 500,
              smooth: 'easeInOutQuart',
              delay: 100,
            })
          }}
          className={`go-to-top`}
        >
          <GoToTop />
        </button>
      </div>
    </>
  )
}

export default App
