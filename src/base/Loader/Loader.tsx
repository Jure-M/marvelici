import * as React from 'react'
import styled from 'styled-components'

// assets
import shild from '../../assets/img/shild.png'

const LoaderStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loader {
    width: 22rem;
    height: 22rem;
    border-radius: 1000rem;
    overflow: hidden;

    .loader__image {
      width: 100%;
      height: 100%;
      animation: spin 3s linear infinite;
    }
  }
`

export const Loader = () => {
  return (
    <LoaderStyled>
      <div className="loader">
        <img className="loader__image" src={shild} />
        <p>loading</p>
      </div>
    </LoaderStyled>
  )
}
