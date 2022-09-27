import * as React from 'react'
import styled from 'styled-components'

// images
import { ReactComponent as StarFilledIcon } from '../../assets/img/starFilled.svg'
import { ReactComponent as StarIcon } from '../../assets/img/star.svg'

const BookmarStyled = styled.div`
  cursor: pointer;
`

interface IBookmarkProps {
  isBookmarked: boolean
  toogleBookmark: (bookmark: boolean) => void
}

export const Bookmark = ({ isBookmarked, toogleBookmark }: IBookmarkProps) => {
  const handleClick = () => {
    toogleBookmark(isBookmarked)
  }

  return (
    <BookmarStyled onClick={handleClick}>
      {isBookmarked ? <StarFilledIcon /> : <StarIcon />}
    </BookmarStyled>
  )
}
