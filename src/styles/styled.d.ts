// styled.d.ts
import 'styled-components'

declare module 'styled-components' {
  export interface Theme {
    colors: {
      primary: string
      secondary: string
      gray100: string
      gray200: string
      gray400: string
      gray800: string
      black: string
      white: string
    }
    fontFamily: {
      display: string
      regular: string
    }
  }
}
