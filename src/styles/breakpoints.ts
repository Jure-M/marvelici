import { Large } from '~/stories/Button.stories'

export const breakpoints = {
  sm: '576px', //mobile
  md: '768px', // tablet
  lg: '992px', // laptop/desktop
  xlg: '1200px' // large desktop
}

export const devices = {
  mobile: `(min-width: ${breakpoints.sm})`,
  tablet: `(min-width: ${breakpoints.md})`,
  laptop: `(min-width: ${breakpoints.lg})`
}

export type Devices = typeof devices
