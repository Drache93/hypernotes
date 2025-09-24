import { Button, Card, Input, Theme, XGroup } from 'tamagui'
import { useCallback, useEffect, useState } from 'react'
import type { NoteData } from '@/backend/machine'
import { useAppState } from '../contexts'
import { Circle } from '@tamagui/lucide-icons'

export interface NoteProps {
  style?: any
  note: NoteData
  open?: boolean
  dimmed?: boolean
  selected?: boolean
  onPress?: (note: NoteData) => void
  onChange?: (content: string) => void
}

export default function Note({
  note,
  open = false,
  dimmed = false,
  selected = false,
  onPress,
  onChange,
  style
}: NoteProps) {
  const { state, action, isReady } = useAppState()
  const [text, setText] = useState(note.content)

  useEffect(() => {
    setText(note.content)
  }, [note.content])

  const handleChange = useCallback(
    (content: string) => {
      setText(content)

      // TODO: debounce
      action('EDIT_NOTE', { content })
    },
    [onChange]
  )

  return (
    <Theme name={note.theme ?? 'blue'}>
      <Card
        style={style}
        key={note.id}
        elevate={!dimmed}
        bordered
        animation='bouncy'
        width={open ? '75%' : undefined}
        height={open ? '50%' : undefined}
        minHeight={100}
        // padding='$2'
        opacity={dimmed ? 0.3 : selected ? 0 : 1}
        scale={dimmed ? 0.95 : selected ? 0 : 1}
        onPress={() => onPress?.(note)}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Input
          flex={1}
          width='100%'
          text='left'
          verticalAlign='top'
          borderWidth={0}
          readOnly={!open}
          multiline={true}
          value={text}
          onChangeText={handleChange}
        />
        {open && (
          <XGroup padded>
            <XGroup.Item>
              <Button
                onPress={() => {
                  action('EDIT_NOTE', { theme: 'blue' })
                }}
                icon={
                  <Theme name='blue'>
                    <Circle background='$background' size={24} />
                  </Theme>
                }
              ></Button>
            </XGroup.Item>
            <XGroup.Item>
              <Button
                onPress={() => {
                  action('EDIT_NOTE', { theme: 'yellow' })
                }}
                icon={
                  <Theme name='yellow'>
                    <Circle background='$background' size={24} />
                  </Theme>
                }
              ></Button>
            </XGroup.Item>
            <XGroup.Item>
              <Button
                onPress={() => {
                  action('EDIT_NOTE', { theme: 'green' })
                }}
                icon={
                  <Theme name='green'>
                    <Circle background='$background' size={24} />
                  </Theme>
                }
              ></Button>
            </XGroup.Item>
            <XGroup.Item>
              <Button
                onPress={() => {
                  action('EDIT_NOTE', { theme: 'red' })
                }}
                icon={
                  <Theme name='red'>
                    <Circle
                      fill='$background'
                      background='$background'
                      size={24}
                    />
                  </Theme>
                }
              ></Button>
            </XGroup.Item>
          </XGroup>
        )}
      </Card>
    </Theme>
  )
}
