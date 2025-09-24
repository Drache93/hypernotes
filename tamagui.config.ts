import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui, createTokens } from 'tamagui'
import { color, radius, size, space, zIndex } from '@tamagui/themes'

const tokens = createTokens({
  size,
  space,
  zIndex,
  color,
  radius
})

export const config = createTamagui({
  ...defaultConfig,
  media: {
    ...defaultConfig.media
    // add your own media queries here, if wanted
  },
  tokens
})

type OurConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends OurConfig {}
}
