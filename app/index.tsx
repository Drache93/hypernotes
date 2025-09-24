import { TamaguiProvider, Theme } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'

import { config } from '../tamagui.config.ts'
import { AppStateProvider } from './contexts'
import App from './app'

export default function () {
  return (
    <SafeAreaView>
      <TamaguiProvider config={config}>
        <Theme name='dark_blue'>
          <AppStateProvider>
            <App />
          </AppStateProvider>
        </Theme>
      </TamaguiProvider>
    </SafeAreaView>
  )
}
