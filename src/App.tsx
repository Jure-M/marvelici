import React from 'react'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'

// components
import Header from './components/Header'
import Footer from '../src/components/Footer'
import GlobalStyle from './styles/GlobalStyle'

// layouts
import PageLayout from '../src/base/Layouts'
import { useBookmarksStore } from './store'
import { usePersonalizeStore } from './store'

const App = (): JSX.Element => {
  const setHeros = useBookmarksStore(state => state.setHeroes)
  const getName = usePersonalizeStore(state => state.getName)

  setHeros()
  getName()

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <PageLayout header={<Header />} footer={<Footer />}>
          <Router />
        </PageLayout>
      </BrowserRouter>
    </>
  )
}

export default App
