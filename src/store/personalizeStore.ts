import create from 'zustand'

const getName = () => {
  const name = localStorage.getItem('name')
  if (name) {
    return JSON.parse(name)
  }
  return ''
}

const setName = (name: string): string => {
  localStorage.setItem('name', JSON.stringify(name))
  return name
}

interface Store {
  name: string
  setName: (name: string) => void
  getName: () => void
}

export const usePersonalizeStore = create<Store>(set => ({
  name: '',
  setName(name) {
    set(state => ({
      ...state,
      name: setName(name)
    }))
  },
  getName() {
    set(state => ({
      ...state,
      name: getName()
    }))
  }
}))
