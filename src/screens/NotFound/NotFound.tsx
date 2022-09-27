import * as React from 'react'
import styled from 'styled-components'

// breakpoints
import { devices } from '../../styles/breakpoints'

// assets
import image404 from '../../assets/img/invisible.jpg'

const NotFoundStyled = styled.div`
  height: calc(100vh - 14rem);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

interface IImage {
  imgSrc: any
}

const Image = styled.div<IImage>`
  grid-column: 1/3;
  grid-row: 1/2;
  overflow: hidden;
  background-position: center;
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #24272b;
    opacity: 0.8;

    @media ${devices.tablet} {
      opacity: 0.5;
    }
  }

  @media ${devices.tablet} {
    grid-column: 1/2;
  }
`

const ContentContainer = styled.div`
  grid-column: 1/3;

  grid-row: 1/2;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.display};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8rem;
  z-index: 2;

  @media ${devices.tablet} {
    padding-left: 2rem;
    grid-column: 2/3;
  }
`

const NotFoundTitle = styled.h1`
  letter-spacing: 1.2rem;
  font-size: 8rem;
  line-height: 1rem;
  margin: 0 0 3rem;

  @media ${devices.tablet} {
    padding-left: 2rem;
    font-size: 10rem;
    line-height: 14rem;
  }
`
const NotFoundSubtitle = styled.span`
  display: block;
  font-size: 3rem;

  @media ${devices.tablet} {
    font-size: 4rem;
  }
`

const NotFound = () => {
  return (
    <NotFoundStyled>
      <Image imgSrc={image404} />
      <ContentContainer>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundSubtitle>Page not found</NotFoundSubtitle>
      </ContentContainer>
    </NotFoundStyled>
  )
}

export default NotFound
