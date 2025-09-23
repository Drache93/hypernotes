import { useState, useEffect, useRef } from 'react'
import { Worklet } from 'react-native-bare-kit'
import { TamaguiProvider, Theme } from 'tamagui'

import bundle from './app.bundle.mjs'
import HRPC from '../spec/hrpc'
import { config } from '../tamagui.config.ts'
import { AppStateProvider, useAppState } from './contexts'
import App from './app'

export default function () {
  const rpc = useRef<HypernotesHRPC | null>(null)

  useEffect(() => {
    const worklet = new Worklet()
    worklet.start('/app.bundle', bundle)
    const { IPC } = worklet

    rpc.current = new HRPC(IPC)
  }, [])

  return (
    <TamaguiProvider config={config}>
      <Theme name='dark_blue'>
        <AppStateProvider hrpc={rpc.current}>
          <App />
        </AppStateProvider>
      </Theme>
    </TamaguiProvider>
  )
}
