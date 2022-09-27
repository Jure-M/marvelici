import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

interface INavLinkStyled {
  size: string
}

const NavLinkStyled = styled(NavLink)<INavLinkStyled>`
  text-transform: uppercase;
  font-size: ${({ size }) => (size === 'mobile' ? '2.5rem' : '1.6rem')};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};

  text-decoration: none;
  padding: 0.3rem 0;

  &:hover {
    color: ${({ theme }) => theme.colors.gray400};
    border-bottom-color: currentColor;
  }

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.gray400};
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray400};
  }
`

interface INavItemProps {
  size: 'mobile' | 'desktop'
  label: string
  to: string
  onClick?: () => void
}

export const NavItem = ({ size, label, to, onClick }: INavItemProps) => {
  return (
    <NavLinkStyled end size={size} to={to} onClick={onClick}>
      {label}
    </NavLinkStyled>
  )
}
