import React from 'react'
import styled from 'styled-components'

// breakpoints
import { devices } from '../../styles/breakpoints'

const PageContainerStyled = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  padding: 0 1.6rem;
  @media ${devices.tablet} {
    padding: 0 3.2rem;
  }
`

export const PageContainer = ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) => <PageContainerStyled>{children}</PageContainerStyled>
