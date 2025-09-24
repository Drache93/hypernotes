import { TamaguiProvider, Theme } from 'tamagui'
import { StatusBar } from 'expo-status-bar'

import { config } from '../tamagui.config.ts'
import { AppStateProvider } from './contexts'
import App from './app'

export default function () {
  return (
    <TamaguiProvider config={config}>
      <Theme name='dark_blue'>
        <StatusBar style='dark' />
        <AppStateProvider>
          <App />
        </AppStateProvider>
      </Theme>
    </TamaguiProvider>
  )
}
