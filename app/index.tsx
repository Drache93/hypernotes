import { TamaguiProvider, Theme, View } from 'tamagui'

import { StatusBar } from 'expo-status-bar'

import { config } from '../tamagui.config.ts'
import { AppStateProvider } from './contexts'
import App from './app'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function () {
  return (
    <TamaguiProvider config={config}>
      <Theme name='dark_blue'>
        <AppStateProvider>
          <View
            position='absolute'
            top={0}
            bottom={0}
            width='100%'
            backgroundColor='$background'
          >
            <SafeAreaView>
              <App />
            </SafeAreaView>
          </View>
          <StatusBar style='light' />
        </AppStateProvider>
      </Theme>
    </TamaguiProvider>
  )
}
