import md5 from 'md5'

// config
import { config } from '../config'

type JSONResponse = {
  data?: {
    results: HeroData[]
    count: number
    total: number
  }
  status?: string
  code?: number
}

type GetHeroesResponse = {
  heroes: HeroData[] | undefined
  count: number | undefined
  total: number | undefined
}

export type HeroData = {
  id: number
  name: string
  description: string
  fetchedAt: string
  thumbnail: {
    path: string
    extension: 'jpg' | 'png' | 'jpeg'
  }
}

export const getHeroes = async (
  searchTerm: string,
  offset: number,
  options?: {
    signal: AbortSignal | null
  }
): Promise<GetHeroesResponse | undefined> => {
  const ts = new Date().getTime()

  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY!
  const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY!

  const hash = md5(ts + privateKey + publicKey)

  const response = await fetch(
    `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&limit=${config.HEROES_PER_PAGE}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`,
    {
      cache: 'force-cache',
      ...options
    }
  )

  const { data, status, code }: JSONResponse = await response.json()

  if (response.ok) {
    return { heroes: data?.results, count: data?.count, total: data?.total }
  } else {
    return Promise.reject(new Error(status))
  }
}
