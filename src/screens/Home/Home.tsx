import * as React from 'react'
import styled, { css } from 'styled-components'
// store
import { useSerchStore } from '../../store/searchStore'

// config
import { config } from '../../config'

// components
import { PageContainer } from '../../base/Containers'
import { PageTitle } from '../../components/PageTitle'
import { SerchArea } from './components'
import { Field } from '../../base/Field'

// api
import { getHeroes } from '../../api/heroes'

// layout
import { Spacer } from '../../styles/utils'

// types
import { Hero } from '../../types/hero'

const HomeStyled = styled.main`
  color: ${({ theme }) => theme.colors.white};
  padding: 3rem 0;

  input {
    border: 1px solid black;
    font-size: 1.8rem;
    padding: 1.2rem 0.7rem;
  }
`

const Home = (): JSX.Element => {
  const searchTerm = useSerchStore(state => state.searchTerm)
  const setSearchTerm = useSerchStore(state => state.setSerchTerm)
  const searchCache = useSerchStore(state => state.serchCache)
  const setSearchCache = useSerchStore(state => state.setSearchCache)

  const [numberOfPages, setNumberOfPages] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)

  const [heroes, setHeroes] = React.useState<Hero[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const timeout = React.useRef<NodeJS.Timeout | null>()
  const controllerRef = React.useRef<AbortController | null>()

  React.useEffect(() => {
    setIsLoading(true)

    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    if (searchTerm.trim()) {
      const controller = new AbortController()
      controllerRef.current = controller

      timeout.current = setTimeout(() => {
        const cache = searchCache.find(
          ({ term, data }) =>
            term === searchTerm && data.find(({ page }) => page === 1)
        )
        setCurrentPage(1)
        if (cache) {
          if (cache.data.find(data => data.page === 1)?.heroes) {
            // @ts-ignore
            setHeroes(cache.data.find(data => data.page === 1)?.heroes)
            setNumberOfPages(cache.numOfPages)
            setIsLoading(false)
          }
        } else {
          fetchHeroes()
        }
      }, 300)
    } else {
      setHeroes([])
      setNumberOfPages(1)
      setIsLoading(false)
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [searchTerm])

  React.useEffect(() => {
    const controller = new AbortController()
    controllerRef.current = controller

    if (searchTerm.trim()) {
      const cache = searchCache.find(
        ({ term, data }) =>
          term === searchTerm && data.find(({ page }) => page === currentPage)
      )
      if (cache) {
        setHeroes(
          cache.data.find(({ page }) => page === currentPage)?.heroes || []
        )
        setNumberOfPages(cache.numOfPages)
      } else {
        fetchHeroes()
      }
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [currentPage])

  const fetchHeroes = async () => {
    try {
      setIsLoading(true)
      const response = await getHeroes(
        searchTerm,
        (currentPage - 1) * config.HEROES_PER_PAGE,
        {
          signal: controllerRef.current?.signal || null
        }
      )
      if (response?.heroes) {
        const heroes = response.heroes.map(hero => {
          return {
            id: hero.id,
            name: hero.name,
            imgUrl: hero.thumbnail.path + '.' + hero.thumbnail.extension,
            bookmarked: false
          }
        })
        setHeroes(heroes)
        if (response?.total) {
          const numberOfPages = Math.ceil(response.total / 20)
          setNumberOfPages(numberOfPages)
          setSearchCache(currentPage, numberOfPages, heroes)
        }
      } else {
        setHeroes([])
      }
      setHasError(false)
      setIsLoading(false)
    } catch (err) {
      setHasError(true)
    }
  }

  const handleInputChange = (input: string) => {
    return setSearchTerm(input)
  }

  const validateInput = (input: string): boolean => {
    if (!input) return true
    if (input.match(/^[A-Za-z]+$/)) {
      return true
    }
    return false
  }

  const isInputValid = validateInput(searchTerm)

  return (
    <HomeStyled>
      <PageContainer>
        <PageTitle
          title="Asemble revengers"
          text="All heroes that ever existed are listed here, chose your heroes and make
        team of revengers to fight evil"
        />
        <Field
          id="search-heroes"
          label="Hero name"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          error={isInputValid ? '' : 'Only text is allowed'}
        />
        <Spacer />
      </PageContainer>
      <SerchArea
        loading={isLoading}
        error={hasError}
        searchTerm={searchTerm}
        heroes={heroes}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />
    </HomeStyled>
  )
}

export default Home
