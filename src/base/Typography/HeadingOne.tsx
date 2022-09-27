import * as React from 'react'
import styled from 'styled-components'

// breakpoints
import { devices } from '../../styles/breakpoints'

const HeadingOneStyled = styled.h1`
  font-size: 2.6rem;
  font-family: ${({ theme }) => theme.fontFamily.regular};
  margin-bottom: 1rem;

  @media ${devices.tablet} {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }
`

export const HeadingOne = ({ title }: { title: string }) => (
  <HeadingOneStyled>{title}</HeadingOneStyled>
)
