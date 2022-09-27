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
