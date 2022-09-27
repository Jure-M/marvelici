import create from 'zustand'

import { Hero } from '../types/hero'

const getHeroes = (): Hero[] => {
  const heroes = localStorage.getItem('bookmarkedHeroes')
  if (heroes) {
    const parsedHeroes = JSON.parse(heroes)
    return parsedHeroes
  }
  return []
}

const addHero = (heroes: Hero[], hero: Hero): Hero[] => {
  const newHeroes = [...heroes, hero]
  localStorage.setItem('bookmarkedHeroes', JSON.stringify(newHeroes))
  return newHeroes
}

const removeHero = (heroes: Hero[], id: number): Hero[] => {
  const newHeroes = heroes.filter(hero => hero.id !== id)
  localStorage.setItem('bookmarkedHeroes', JSON.stringify(newHeroes))
  return newHeroes
}

interface Store {
  bookmarkedHeroes: Hero[]
  setHeroes: () => void
  addHero: (hero: Hero) => void
  removeHero: (id: number) => void
}

export const useBookmarksStore = create<Store>(set => ({
  bookmarkedHeroes: [],
  setHeroes() {
    set(state => ({
      ...state,
      bookmarkedHeroes: getHeroes()
    }))
  },
  addHero(hero: Hero) {
    set(state => ({
      ...state,
      bookmarkedHeroes: addHero(state.bookmarkedHeroes, hero)
    }))
  },
  removeHero(id: number) {
    set(state => ({
      ...state,
      bookmarkedHeroes: removeHero(state.bookmarkedHeroes, id)
    }))
  }
}))
