import * as React from 'react'
import styled from 'styled-components'

// typography
import { TextLead } from '../../base/Typography'

interface IImageBackground {
  imgSrc: any
}

const ImageBackgroundStyled = styled.div<IImageBackground>`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-repeat: no-repeat;
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #24272b;
    opacity: 0.92;
  }

  & > * {
    z-index: 2;
  }
`

interface IPageMessageProps {
  imgSrc: any
  message: string
}
export const PageMessage = ({ imgSrc, message }: IPageMessageProps) => {
  return (
    <ImageBackgroundStyled imgSrc={imgSrc}>
      <TextLead text={message} />
    </ImageBackgroundStyled>
  )
}
