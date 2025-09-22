import {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback
} from 'react'

interface HypernotesAppContext {
  state: HypernotesState
  action: (action: HypernotesAction) => void
}

const appStateContext = createContext<HypernotesAppContext>({
  state: {},
  action: (action: HypernotesAction) => {}
})

export const useAppState = () => useContext(appStateContext)

export default function AppStateProvider({
  children,
  hrpc
}: {
  children: React.ReactNode
  hrpc: HypernotesHRPC | null
}) {
  const [appState, setAppState] = useState<HypernotesState>({})

  const action = useCallback(async (action: HypernotesAction) => {
    if (!hrpc) return

    try {
      const response = await hrpc.state({ action })
      console.log(hrpc, action, response)
      setAppState(response.state)
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <appStateContext.Provider value={{ state: appState, action }}>
      {children}
    </appStateContext.Provider>
  )
}
