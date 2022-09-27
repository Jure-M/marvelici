import styled from 'styled-components'

// breakpoints
import { devices } from '../../styles/breakpoints'

export const Spacer = styled.div`
  margin-bottom: 2rem;

  @media ${devices.tablet} {
    margin-bottom: 3.6rem;
  }
`
