import * as React from 'react'
import styled from 'styled-components'

// assets
import { ReactComponent as LeftArrowIcon } from '../../assets/img/leftArrow.svg'
import { ReactComponent as RightArrowIcon } from '../../assets/img/rightArrow.svg'

// utils
import { range } from '../../utils'

const PaginationStyled = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0.3rem;
`

interface IIconContainerProps {
  isDisabled: boolean
}

const IconContainer = styled.button<IIconContainerProps>`
  display: grid;
  place-items: center;
  width: 2.8rem;
  border: 2px solid ${({ theme }) => theme.colors.gray400};
  cursor: pointer;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
  background-color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.colors.gray200 : theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray800};
  }
`

interface IPageNumberProps {
  isCurrent: boolean
}

const PageNuberStyled = styled.button<IPageNumberProps>`
  border: 2px solid
    ${({ isCurrent, theme }) =>
      isCurrent ? theme.colors.secondary : theme.colors.gray400};
  color: ${({ isCurrent, theme }) =>
    isCurrent ? theme.colors.secondary : theme.colors.gray400};
  background-color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  font-size: 2rem;
  width: 2.8rem;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray800};
  }
`

interface IPaginationProps {
  numOfPages: number
  currentPage: number
  handlePageChange: (page: number) => void
}

export const Pagination = ({
  numOfPages,
  currentPage,
  handlePageChange
}: IPaginationProps) => {
  const rangeOfPages = range(1, numOfPages)

  return (
    <PaginationStyled>
      <IconContainer
        isDisabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <LeftArrowIcon />
      </IconContainer>
      {rangeOfPages.map(number => (
        <PageNuberStyled
          isCurrent={number === currentPage}
          key={number}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </PageNuberStyled>
      ))}
      <IconContainer
        isDisabled={currentPage === numOfPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <RightArrowIcon />
      </IconContainer>
    </PaginationStyled>
  )
}
