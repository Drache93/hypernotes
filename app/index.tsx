import { useState, useEffect, useRef } from 'react'
import { Text } from 'react-native'
import { Worklet } from 'react-native-bare-kit'
import bundle from './app.bundle.mjs'
import HRPC from '../spec/hrpc'
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
    <AppStateProvider hrpc={rpc.current}>
      <App />
    </AppStateProvider>
  )
}
