import create from 'zustand'
import { Hero } from '../types/hero'

type SearchCache = {
  term: string
  numOfPages: number
  data: {
    page: number
    heroes: Hero[]
  }[]
}

const isTextOnlyLetters = (text: string): boolean => {
  if (text.match(/^[A-Za-z]+$/)) {
    return true
  }
  return false
}

const setSearchCache = (
  cache: SearchCache[],
  term: string,
  page: number,
  numOfPages: number,
  heroes: Hero[]
): SearchCache[] => {
  // limit cache size
  if (cache.length > 25) return cache
  // find if there is search term in cache
  const currentTermInCache = cache.find(cache => cache.term === term)
  if (currentTermInCache) {
    const pageInCache = currentTermInCache.data.find(data => data.page === page)
    if (pageInCache) {
      // if page is already in cache return cache
      return cache
    } else {
      // add page to cached serch term
      return cache.map(cache =>
        cache.term === term
          ? { ...cache, data: [...cache.data, { page, heroes }] }
          : cache
      )
    }
  } else {
    // create new serch term in cache
    return [
      ...cache,
      {
        term: term,
        numOfPages: numOfPages,
        data: [
          {
            page,
            heroes
          }
        ]
      }
    ]
  }
}

const setSearchTerm = (searchTerm: string): string => searchTerm

const setCurrentPage = (page: number): number => page

interface Store {
  searchTerm: string
  isSerchTermValid: boolean
  currentPage: number
  serchCache: SearchCache[]
  setSearchTerm: (name: string) => void
  setCurrentPage: (page: number) => void
  setSearchCache: (page: number, numOfPages: number, heroes: Hero[]) => void
  //
}

export const useSerchStore = create<Store>((set, get) => ({
  searchTerm: '',
  isSerchTermValid: true,
  currentPage: 1,
  serchCache: [],
  setSearchTerm(name) {
    set(state => ({
      ...state,
      searchTerm: setSearchTerm(name),
      isSerchTermValid: isTextOnlyLetters(name)
    }))
  },
  setCurrentPage(page) {
    set(state => ({
      ...state,
      currentPage: setCurrentPage(page)
    }))
  },
  setSearchCache(page, numOfPages, heroes) {
    set(state => ({
      ...state,
      serchCache: setSearchCache(
        state.serchCache,
        state.searchTerm,
        page,
        numOfPages,
        heroes
      )
    }))
  }
}))
