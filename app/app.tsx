import { useEffect } from 'react'
import { useAppState } from './contexts'
import { Text } from 'react-native'

export default function App() {
  const { state, action } = useAppState()

  useEffect(() => {
    action({ hello: 'world' })
  }, [])

  return <Text>Hello {state.hello}</Text>
}
