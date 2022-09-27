import * as React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  height: 6rem;
  background: ${({ theme }) => theme.colors.black};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 3rem;

  p {
    color: white;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; Unknow Author</p>
    </StyledFooter>
  )
}

export default Footer
