import * as React from 'react'
import styled from 'styled-components'

// components
import Logo from '../../base/Logo'
import NavigaionMain from '../NavigaionMain'
import { NavigationMobile } from '../NavigationMobile'

// breakpoints
import { devices } from '../../styles/breakpoints'

const StyledHeader = styled.header`
  height: 8rem;
  background: ${({ theme }) => theme.colors.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;

  @media ${devices.tablet} {
    padding: 0 3rem;
  }
`

const NavigaionMainContainer = styled.div`
  display: none;
  @media ${devices.tablet} {
    display: flex;
  }
`

const NavigaionMobileContainer = styled.div`
  display: block;
  @media ${devices.tablet} {
    display: none;
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <NavigaionMainContainer>
        <NavigaionMain />
      </NavigaionMainContainer>
      <NavigaionMobileContainer>
        <NavigationMobile />
      </NavigaionMobileContainer>
    </StyledHeader>
  )
}

export default Header
