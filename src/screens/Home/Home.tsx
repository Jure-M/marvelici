import * as React from 'react'
import styled, { css } from 'styled-components'
// store
import { useSerchStore } from '../../store/searchStore'

// hooks
import { useFetchHeroes } from './useFetchHeroes'

// components
import { PageContainer } from '../../base/Containers'
import { PageTitle } from '../../components/PageTitle'
import { SerchArea } from './components'
import { Field } from '../../base/Field'

// layout
import { Spacer } from '../../styles/utils'

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
  const {
    searchTerm,
    setSearchTerm,
    isSerchTermValid,
    status,
    heroes,
    numberOfPages,
    currentPage,
    setCurrentPage
  } = useFetchHeroes()

  const handleInputChange = (input: string) => {
    setSearchTerm(input)
  }

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
          error={searchTerm && !isSerchTermValid ? 'Only text is allowed' : ''}
        />
        <Spacer />
      </PageContainer>
      <SerchArea
        status={status}
        searchTerm={searchTerm}
        heroes={heroes}
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        isInputValid={!searchTerm || isSerchTermValid}
        handlePageChange={setCurrentPage}
      />
    </HomeStyled>
  )
}

export default Home
