import * as React from 'react'
import styled from 'styled-components'

// components
import { PageTitle } from '../../components/PageTitle'
import { HeroesGrid } from '../../components/HeroesGrid'
import { PageContainer } from '../../base/Containers'

// store
import { useBookmarksStore } from '../../store/bookmarksStore'
import { usePersonalizeStore } from '../../store'

const RevengersStyled = styled.main`
  background: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
`

const Revengers = () => {
  const bookmarkedHeroes = useBookmarksStore(state => state.bookmarkedHeroes)
  const name = usePersonalizeStore(state => state.name)

  return (
    <RevengersStyled>
      <PageContainer>
        <PageTitle
          title="Revengers"
          text={
            name
              ? `Captain ${name}, revengers are waiting your orders`
              : 'Team of brave warriors ready to fight evil forces'
          }
        />
        <HeroesGrid heroes={bookmarkedHeroes} withTransition />
      </PageContainer>
    </RevengersStyled>
  )
}

export default Revengers
