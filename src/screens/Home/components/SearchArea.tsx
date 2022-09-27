import * as React from 'react'
import styled from 'styled-components'

// components
import { Loader } from '../../../base/Loader'
import { PageMessage } from '../../../components/PageMessage'
import { HeroesGrid } from '../../../components/HeroesGrid'
import { Pagination } from '../../../components/Pagination'
import { PageContainer } from '../../../base/Containers'

// assets
import villains from '../../../assets/img/villains.jpeg'
import marvelHeros from '../../../assets/img/marvelHeros.jpg'
import explosion from '../../../assets/img/explosion.png'

// layout
import { Spacer } from '../../../styles/utils'

// types
import { Hero } from '../../../types/hero'

// store
import { useBookmarksStore } from '../../../store/bookmarksStore'

const LoaderContainer = styled.div`
  min-height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ISearchAreaProps {
  loading: boolean
  error: boolean
  searchTerm: string
  heroes: Hero[]
  numberOfPages: number
  currentPage: number
  handlePageChange: (page: number) => void
}

export const SerchArea = ({
  loading,
  error,
  searchTerm,
  heroes,
  numberOfPages,
  currentPage,
  handlePageChange
}: ISearchAreaProps) => {
  const bookmarkedHeroes = useBookmarksStore(state => state.bookmarkedHeroes)

  const heroesWithBookMark: Hero[] = heroes.map(hero => {
    const isMatch = bookmarkedHeroes.find(
      bookmakHero => bookmakHero.id === hero.id
    )
    return { ...hero, bookmarked: !!isMatch }
  })

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    )
  }

  if (!loading && error) {
    return (
      <PageMessage
        imgSrc={explosion}
        message=" something went wrong,  find nearest
    bunker to hide"
      />
    )
  }

  if (!loading && heroes.length === 0 && searchTerm.trim()) {
    return <PageMessage imgSrc={villains} message="no heroes found" />
  }

  if (!loading && !searchTerm.trim()) {
    return (
      <PageMessage
        imgSrc={marvelHeros}
        message="type something to start search"
      />
    )
  }

  return (
    <div>
      {!loading && (
        <PageContainer>
          <>
            <HeroesGrid heroes={heroesWithBookMark} />
            {!loading && heroes.length > 0 && (
              <>
                <Spacer />
                <Pagination
                  numOfPages={numberOfPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              </>
            )}
          </>
        </PageContainer>
      )}
    </div>
  )
}
