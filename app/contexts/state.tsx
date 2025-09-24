import type { Context, Actions } from '@/backend/machine'
import { documentDirectory } from 'expo-file-system'
import { Worklet } from 'react-native-bare-kit'
import bundle from './../app.bundle.mjs'
import HRPC from '../../spec/hrpc'
import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react'

interface HypernotesAppContext {
  state: Context
  action: (action: Actions, payload?: any) => Promise<any>
  isReady: boolean
}

const appStateContext = createContext<HypernotesAppContext>({
  state: {
    currentNote: undefined,
    notes: []
  },
  action: async (action: Actions, payload?: any) => {},
  isReady: false
})

export const useAppState = () => useContext(appStateContext)

export default function AppStateProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [isWorkletStarted, setIsWorkletStarted] = useState(false)
  const [appState, setAppState] = useState<Context>({
    currentNote: undefined,
    notes: []
  })

  const hrpc = useRef<any | null>(null)

  useEffect(() => {
    const worklet = new Worklet()
    worklet.start('/app.bundle', bundle, [String(documentDirectory)])
    const { IPC } = worklet

    hrpc.current = new HRPC(IPC)

    setIsWorkletStarted(true)

    async function init() {
      console.log('init')
      try {
        await hrpc.current.state({
          action: 'SUSPEND',
          payload: {}
        })

        const response = await hrpc.current.state({
          action: 'START',
          payload: {}
        })
        console.log('response', response)
        setAppState(response.state)
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  const action = useCallback(async (action: Actions, payload: any) => {
    if (!hrpc) return

    try {
      const response = await hrpc.current.state({ action, payload })
      console.log('response', action, response)
      setAppState(response.state)

      return response.state
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <appStateContext.Provider
      value={{ state: appState, action, isReady: isWorkletStarted }}
    >
      {children}
    </appStateContext.Provider>
  )
}
