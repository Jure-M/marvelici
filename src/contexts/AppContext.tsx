import * as React from 'react'

interface AppContextInterface {
  lang: string
}

export const AppContext = React.createContext<AppContextInterface | null>(null)

export const AppContextProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[]
}) => {
  return (
    <AppContext.Provider value={{ lang: 'en' }}>{children}</AppContext.Provider>
  )
}
