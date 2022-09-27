import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

NavLink

const StyledLogo = styled(NavLink)`
  cursor: pointer;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Luckiest Guy', cursive;
  letter-spacing: 1px;
  text-decoration: none;
`

console.log('%c Javljam se.', 'color: #6da832')
const Logo = () => {
  return <StyledLogo to="/">\revengers./</StyledLogo>
}

export default Logo
