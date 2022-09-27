import * as React from 'react'
import styled from 'styled-components'

interface IPageLayoutProps {
  header: React.ReactNode
  children: React.ReactNode
  footer: React.ReactNode
}

const PageLayoutStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    height: 8rem;
  }

  .main {
    flex-grow: 1;
    background-color: ${({ theme }) => theme.colors.gray800};
  }

  .footer {
    margin-top: auto;
    height: 6rem;
  }
`

const PageLayout = ({ header, children, footer }: IPageLayoutProps) => {
  return (
    <PageLayoutStyled>
      <div className="header">{header} </div>
      <div className="main">{children} </div>
      <div className="footer">{footer} </div>
    </PageLayoutStyled>
  )
}

export default PageLayout
