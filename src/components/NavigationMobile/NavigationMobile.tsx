import * as React from 'react'
import styled from 'styled-components'

// components
import { NavItem } from '../../base/NavItem'

// assets
import { ReactComponent as MenuIcon } from '../../assets/img/menuIcon.svg'

//data
import { navigation } from '../../data'

const NavigationMobileStyled = styled.div``

interface IOpenProps {
  isOpen: boolean
}

const MenuIconContainer = styled.nav<IOpenProps>`
  @keyframes rotate {
    0% {
      transform: rotate(360deg);
    }
    25% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  position: relative;
  cursor: pointer;
  z-index: 99;

  transform: ${({ isOpen }) => (isOpen ? 'rotate(360deg)' : 'rotate(0deg)')};
  transition: 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    animation: rotate 0.2s linear;
  }
`

const MenuIconStyled = styled(MenuIcon)`
  width: 3rem;
  height: 3rem;
`

const NavigationItemsStyled = styled.div<IOpenProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 20vh;
  left: 0;
  height: 80vh;
  width: 100vw;
  padding: 5vh 10vw;
  z-index: 99;
`
const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

const NavigtionOverlayStyled = styled.div<IOpenProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  width: 100vw;
  height: 100vh;
  z-index: 99;
`

export const NavigationMobile = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const bodyRef = React.useRef<any>(false)

  React.useEffect(() => {
    bodyRef.current = document.body
  }, [])

  const toggleOpen = (): void => {
    bodyRef.current.classList.toggle('no-scroll')
    setIsOpen(!isOpen)
  }

  return (
    <NavigationMobileStyled>
      <NavigtionOverlayStyled isOpen={isOpen} />
      <MenuIconContainer isOpen={isOpen} onClick={toggleOpen}>
        <MenuIconStyled />
      </MenuIconContainer>
      <NavigationItemsStyled isOpen={isOpen}>
        <NavigationList>
          {navigation.map(({ path, label }) => (
            <li key={path}>
              <NavItem size="mobile" label={label} to={path} />
            </li>
          ))}
        </NavigationList>
      </NavigationItemsStyled>
    </NavigationMobileStyled>
  )
}
