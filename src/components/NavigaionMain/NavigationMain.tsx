import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// components
import { NavItem } from '../../base/NavItem'
import { navigation } from '../../data/'

const NavigationMainStyled = styled.nav`
  text-transform: uppercase;
`

const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`

const NavigaionMain = () => {
  return (
    <NavigationMainStyled>
      <NavigationList>
        {navigation.map(({ path, label }) => (
          <li key={path}>
            <NavItem size="desktop" label={label} to={path} />
          </li>
        ))}
      </NavigationList>
    </NavigationMainStyled>
  )
}

export default NavigaionMain
