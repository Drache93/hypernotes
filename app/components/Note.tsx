import { Card, SizableText } from 'tamagui'

export interface NoteProps {
  note: Note
  open?: boolean
  dimmed?: boolean
  onPress?: (note: Note) => void
}

export default function Note({
  note,
  open = false,
  dimmed = false,
  onPress
}: NoteProps) {
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
      padding='$4'
      opacity={dimmed ? 0.3 : 1}
      scale={dimmed ? 0.95 : 1}
      onPress={() => onPress?.(note)}
    >
      <SizableText opacity={dimmed ? 0.5 : 1}>{note.content}</SizableText>
    </Card>
  )
}
