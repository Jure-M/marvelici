import * as React from 'react'
import styled from 'styled-components'

// utils
import { textResetStyle } from './utils'

// breakpoints
import { devices } from '../../styles/breakpoints'

const TextLeadStyled = styled.p`
  b {
    ${textResetStyle};
    font-size: 2rem;
    font-family: ${({ theme }) => theme.fontFamily.regular};
    @media ${devices.tablet} {
      font-size: 2.8rem;
    }
  }
`

export const TextLead = ({ text }: { text: string }) => (
  <TextLeadStyled>
    <b>{text}</b>
  </TextLeadStyled>
)
