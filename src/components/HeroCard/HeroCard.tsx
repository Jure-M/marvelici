import * as React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

//types
import { Hero } from '../../types/hero'

// store
import { useBookmarksStore } from '../../store/bookmarksStore'
import { Bookmark } from '../../base/Bookmark'
import { usePersonalizeStore } from '../../store'

// breakpoints
import { devices } from '../../styles/breakpoints'

const HeroCardStyled = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.3rem;
  overflow: hidden;
  position: relative;
  height: 100%;

  h2 {
    font-size: 1.8rem;
    padding: 0rem 1rem;
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fontFamily.display};
    letter-spacing: 0.2rem;

    @media ${devices.tablet} {
      font-size: 2.2rem;
    }
  }

  .bookmark {
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1rem;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 32rem;

    @media ${devices.tablet} {
      height: 25rem;
    }
  }
`

const HeroCardWrapper = styled.div`
  position: relative;
`

const HeroMessageStyled = styled.div`
  position: absolute;
  top: -5rem;
  left: 1.5rem;
  right: 4rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid black;
  color: ${({ theme }) => theme.colors.black};
  z-index: 3;
  border-radius: 45%;
  box-shadow: -0.5rem 0.4rem ${({ theme }) => theme.colors.black};

  .transition-enter {
    opacity: 0.01;
    transform: translate(0, 5rem);
  }

  .transition-enter-active {
    opacity: 1;
    transition: all 0.5s ease-in;
    transform: translate(0, 0);
  }

  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }

  .transition-exit-active {
    opacity: 0.01;
    transition: all 0.5s ease-in;
    transform: translate(0, -5rem);
    top: 0rem;
  }

  p {
    margin: 0;
    font-size: 1.4rem;
  }

  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    bottom: -2.5rem;
    left: 25%;
    border-top: 3rem solid white;
    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
    z-index: 3;
  }

  &:before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    bottom: -3rem;
    left: 23%;
    border-top: 3rem solid black;
    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
  }
`

const HeroCard = ({ id, name, imgUrl, bookmarked }: Hero) => {
  const bookmarksStore = useBookmarksStore()
  const userName = usePersonalizeStore(state => state.name)

  const nodeRef = React.useRef(null)

  const [showMessage, setShowMessage] = React.useState(false)

  const toogleBookmark = () => {
    if (bookmarksStore.bookmarkedHeroes.find(hero => hero.id === id)) {
      bookmarksStore.removeHero(id)
    } else {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 2000)

      bookmarksStore.addHero({
        id,
        name,
        imgUrl,
        bookmarked: true
      })
    }
  }

  return (
    <HeroCardWrapper>
      <CSSTransition
        in={showMessage}
        nodeRef={nodeRef}
        timeout={500}
        classNames="transition"
        unmountOnExit
      >
        <HeroMessageStyled ref={nodeRef}>
          <p>Hello {userName}, ready to serve revengers</p>
        </HeroMessageStyled>
      </CSSTransition>
      <HeroCardStyled>
        <div className="bookmark">
          <Bookmark isBookmarked={bookmarked} toogleBookmark={toogleBookmark} />
        </div>
        <div className="image">
          <img src={imgUrl} alt={name} />
        </div>
        <h2>{name}</h2>
      </HeroCardStyled>
    </HeroCardWrapper>
  )
}

export default HeroCard
