import * as React from 'react'

// typography
import { HeadingOne, Text } from '../../base/Typography'

// layouts
import { Spacer } from '../../styles/utils'

interface IPageTitleProps {
  title: string
  text: string
}

export const PageTitle = ({ title, text }: IPageTitleProps) => {
  return (
    <Spacer>
      <HeadingOne title={title} />
      <Text text={text} />
    </Spacer>
  )
}
