import * as React from 'react'
import styled from 'styled-components'

// utils
import { textResetStyle } from './utils'

// breakpoints
import { devices } from '../../styles/breakpoints'

const TextStyled = styled.p`
  ${textResetStyle};
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.regular};

  @media ${devices.tablet} {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`

export const Text = ({ text }: { text: string }) => (
  <TextStyled>{text}</TextStyled>
)
