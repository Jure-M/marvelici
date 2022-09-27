import * as React from 'react'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// components
import HeroCard from '../HeroCard'

// breakpoints
import { devices } from '../../styles/breakpoints'

// types
import { Hero } from '../../types/hero'

const HeroesGridStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  gap: 1rem;

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }

  .transition-enter {
    opacity: 0.01;
  }

  .transition-enter-active {
    opacity: 1;
    transition: all 0.5s ease-in;
  }

  .transition-exit {
    opacity: 1;
  }

  .transition-exit-active {
    opacity: 0.01;
    transition: all 0.5s ease-in;
  }
`

interface IHeroesGridProps {
  heroes: Hero[]
  withTransition?: boolean
}

export const HeroesGrid = ({
  heroes,
  withTransition = false
}: IHeroesGridProps) => {
  if (!withTransition) {
    return (
      <HeroesGridStyled>
        {heroes.map(({ id, name, imgUrl, bookmarked }) => (
          <HeroCard
            key={id}
            id={id}
            name={name}
            imgUrl={imgUrl}
            bookmarked={bookmarked}
          />
        ))}
      </HeroesGridStyled>
    )
  }

  return (
    <TransitionGroup component={HeroesGridStyled}>
      {heroes.map(({ id, name, imgUrl, bookmarked }) => (
        <CSSTransition key={id} timeout={500} classNames="transition">
          <HeroCard
            id={id}
            name={name}
            imgUrl={imgUrl}
            bookmarked={bookmarked}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
