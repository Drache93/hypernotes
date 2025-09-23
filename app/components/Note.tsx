import { Card, SizableText } from 'tamagui'
import {
  MarkdownTextInput,
  parseExpensiMark
} from '@expensify/react-native-live-markdown'
import { useCallback, useEffect, useState } from 'react'

export interface NoteProps {
  note: Note
  open?: boolean
  dimmed?: boolean
  onPress?: (note: Note) => void
  onChange?: (content: string) => void
}

export default function Note({
  note,
  open = false,
  dimmed = false,
  onPress,
  onChange
}: NoteProps) {
  const [text, setText] = useState(note.content)

  useEffect(() => {
    setText(note.content)
  }, [note.content])

  const handleChange = useCallback(
    (content: string) => {
      setText(content)
      onChange?.(content)
    },
    [onChange]
  )

  return (
    <Card
      key={note.id}
      elevate={!dimmed}
      bordered
      animation='bouncy'
      width={open ? '75%' : undefined}
      minWidth='40%'
      maxWidth={open ? undefined : '50%'}
      flex={open ? 0 : 1}
      height={open ? '50%' : 250}
      padding='$2'
      opacity={dimmed ? 0.3 : 1}
      scale={dimmed ? 0.95 : 1}
      onPress={() => onPress?.(note)}
    >
      <MarkdownTextInput
        style={{
          color: '#fff',
          height: '100%',
          textAlign: 'left',
          width: '100%',
          verticalAlign: 'top'
        }}
        readOnly={!open}
        multiline={true}
        value={text}
        onChangeText={handleChange}
        parser={parseExpensiMark}
      />
    </Card>
  )
}
