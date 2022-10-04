import * as React from 'react'
import { useIsFirstRender } from '../../hooks/useIsFirstRender'
import { useSerchStore } from '../../store/searchStore'

// types
import { Hero } from '../../types/hero'
import { FetchStatus } from './types'

// api
import { getHeroes } from '../../api/heroes'

// config
import { config } from '../../config'

interface IuseFethHeroes {
  searchTerm: string
  setSearchTerm: (input: string) => void
  isSerchTermValid: boolean
  status: FetchStatus
  heroes: Hero[]
  numberOfPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

export const useFetchHeroes = (): IuseFethHeroes => {
  const isFirstRender = useIsFirstRender()

  const {
    searchTerm,
    setSearchTerm,
    isSerchTermValid,
    serchCache,
    setSearchCache,
    currentPage,
    setCurrentPage
  } = useSerchStore(state => state)

  const [heroes, setHeroes] = React.useState<Hero[]>([])
  const [numberOfPages, setNumberOfPages] = React.useState(0)
  const [status, setStatus] = React.useState<FetchStatus>('idile')

  const timeout = React.useRef<NodeJS.Timeout | null>()
  const controllerRef = React.useRef<AbortController | null>()

  const fetchHeroes = async () => {
    // check if there is any data in cache
    const cache = serchCache.find(
      ({ term, data }) =>
        term === searchTerm && data.find(({ page }) => page === currentPage)
    )
    if (cache) {
      setHeroes(
        cache.data.find(({ page }) => page === currentPage)?.heroes || []
      )
      setNumberOfPages(cache.numOfPages)
      setStatus('idile')
      return
    }
    // start api call if there is no data in cache
    try {
      setStatus('fetching')
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
          const numberOfPages = Math.ceil(
            response.total / config.HEROES_PER_PAGE
          )
          setNumberOfPages(numberOfPages)
          setSearchCache(currentPage, numberOfPages, heroes)
        }
      } else {
        setHeroes([])
      }
      setStatus('idile')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return setStatus('idile')
      } else if (err instanceof Error) {
        setStatus('error')
      } else {
        setStatus('error')
      }
    }
  }

  React.useEffect(() => {
    if (isFirstRender) return

    setStatus('fetching')
    timeout.current = setTimeout(() => {
      if (!searchTerm) {
        setHeroes([])
        setCurrentPage(1)
        setStatus('idile')
      } else if (searchTerm && isSerchTermValid) {
        // if current page is 1 for old serch fetche heroes
        // else set current page to 1, and let page change fetch heroes
        if (currentPage === 1) {
          const controller = new AbortController()
          controllerRef.current = controller
          fetchHeroes()
        } else {
          setStatus('idile')
          setCurrentPage(1)
        }
      }
    }, 300)

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [searchTerm])

  React.useEffect(() => {
    if (!searchTerm) return

    if (searchTerm && isSerchTermValid) {
      const controller = new AbortController()
      controllerRef.current = controller
      fetchHeroes()
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [currentPage])

  return {
    searchTerm,
    setSearchTerm,
    isSerchTermValid,
    status,
    heroes,
    numberOfPages,
    currentPage,
    setCurrentPage
  }
}
