import * as React from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  font-size: 1.5rem;
  padding: 1.4rem 3rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
  font-weight: 700;
`

interface IButtonProps {
  text: string
  onClick: () => void
}

export const Button = ({ text, onClick }: IButtonProps) => {
  return (
    <ButtonStyled onClick={onClick} type="button">
      {text}
    </ButtonStyled>
  )
}
