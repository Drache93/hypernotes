import { useEffect } from 'react'
import { useAppState } from './contexts'
import { SizableText, XStack, ScrollView, Card, H2, H3, H4 } from 'tamagui'

export default function App() {
  const { state, action } = useAppState()

  useEffect(() => {
    action({ hello: 'world' })
  }, [])

  return (
    <ScrollView
      height='100%'
      width='100%'
      backgroundColor='$background'
      padding='$4'
    >
      <XStack flex={1} flexWrap='wrap'>
        {new Array(10).fill(null).map((_, index) => (
          <Card
            key={index}
            elevate
            bordered
            animation='bouncy'
            size='$4'
            width='50%'
            height={300}
            scale={0.9}
          >
            <Card.Header padded>
              <SizableText size='$6'>My Note</SizableText>
              <SizableText>Lots of content</SizableText>
            </Card.Header>
            {/*<Card.Footer>
                <Text>World</Text>
              </Card.Footer>*/}
            {/*<Card.Background />*/}
          </Card>
        ))}
      </XStack>
    </ScrollView>
  )
}
