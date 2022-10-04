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
import { FetchStatus } from '../types'

// store
import { useBookmarksStore } from '../../../store/bookmarksStore'

const LoaderContainer = styled.div`
  min-height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ISearchAreaProps {
  status: FetchStatus
  searchTerm: string
  heroes: Hero[]
  isInputValid: boolean
  numberOfPages: number
  currentPage: number
  handlePageChange: (page: number) => void
}

export const SerchArea = ({
  status,
  searchTerm,
  heroes,
  isInputValid,
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

  if (status === 'fetching') {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    )
  }

  if (status === 'error') {
    return (
      <PageMessage
        imgSrc={explosion}
        message=" something went wrong,  find nearest
    bunker to hide"
      />
    )
  }

  if (status === 'idile' && !isInputValid) {
    return (
      <PageMessage imgSrc={villains} message="nice try, please be serious" />
    )
  }

  if (status === 'idile' && searchTerm && heroes.length === 0) {
    return <PageMessage imgSrc={villains} message="no heroes found" />
  }

  if (status === 'idile' && !searchTerm) {
    return (
      <PageMessage
        imgSrc={marvelHeros}
        message="type something to start search"
      />
    )
  }

  return (
    <div>
      {status === 'idile' && (
        <PageContainer>
          <>
            <HeroesGrid heroes={heroesWithBookMark} />
            {heroes.length > 0 && (
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
