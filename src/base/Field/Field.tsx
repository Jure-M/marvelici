import * as React from 'react'
import styled from 'styled-components'

// breakpoints
import { devices } from '../../styles/breakpoints'

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

const InputStyled = styled.input`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.black};
  font-size: 1.8rem;
  padding: 1.2rem 0.7rem;
  width: 100%;

  @media ${devices.mobile} {
    max-width: 30rem;
  }
`

const StyledLabel = styled.label`
  font-size: 1.8rem;
`

const StyledError = styled.span`
  position: absolute;
  bottom: -2rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.primary};
`

interface IFieldProps {
  id: any
  value: string
  onChange: (name: string) => void
  type: 'text' | 'password' | 'email'
  label?: string
  error?: string
}

export const Field = ({
  id,
  value,
  onChange,
  type,
  label,
  error
}: IFieldProps) => {
  return (
    <FieldWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <InputStyled
        id={id}
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
      {error && <StyledError>*{error}</StyledError>}
    </FieldWrapper>
  )
}
