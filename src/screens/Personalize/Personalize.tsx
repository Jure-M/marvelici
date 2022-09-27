import * as React from 'react'
import styled from 'styled-components'
import { usePersonalizeStore } from '../../store'

// components
import { PageTitle } from '../../components/PageTitle'
import { PageContainer } from '../../base/Containers'
import { Button } from '../../base/Button'
import { Field } from '../../base/Field'

// breakpoints
import { devices } from '../../styles/breakpoints'

// layouts
import { Spacer } from '../../styles/utils'

const PersonalizeStyled = styled.main`
  background: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
`

const InputButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: stretch;

  @media ${devices.mobile} {
    align-items: flex-end;
    flex-direction: row;
  }
`

const Personalize = () => {
  const name = usePersonalizeStore(state => state.name)
  const setName = usePersonalizeStore(state => state.setName)

  const [input, setInput] = React.useState(name)

  const handleInputChange = (input: string) => {
    return setInput(input)
  }

  const handleButtonClick = () => {
    setName(input)
  }

  return (
    <PersonalizeStyled>
      <PageContainer>
        <PageTitle
          title="Personalize application"
          text="Identify yourself so heroes can greet you"
        />
        <Spacer />
        <InputButtonGroup>
          <Field
            id="captain-name"
            label="Name"
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button text="save" onClick={handleButtonClick} />
        </InputButtonGroup>
      </PageContainer>
    </PersonalizeStyled>
  )
}

export default Personalize
