import { useCallback, useEffect, useState } from 'react'
import { useAppState } from './contexts'
import {
  SizableText,
  XStack,
  ScrollView,
  Card,
  H2,
  H3,
  H4,
  ZStack,
  Button,
  View
} from 'tamagui'
import { Plus } from '@tamagui/lucide-icons'
import Note from './components/Note'

export default function App() {
  const { state, action } = useAppState()
  const [openNote, setOpenNote] = useState(-1)
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    action({ hello: 'world' })
  }, [])

  const handleNewNote = useCallback(() => {
    console.log('handleNewNote')
    const currentNotes = [...notes]
    setNotes((notes) => [
      ...notes,
      { id: Date.now().toString(), content: 'Hello world!' }
    ])
    setOpenNote(currentNotes.length)
  }, [notes])

  return (
    <ZStack height='100%' width='100%'>
      <ScrollView
        height='100%'
        width='100%'
        backgroundColor='$background'
        padding='$4'
      >
        <XStack flex={1} flexWrap='wrap' gap='$4'>
          {notes.map((note, index) => (
            <Note
              key={index}
              note={note}
              dimmed={openNote > -1 && openNote !== index}
              onPress={() => setOpenNote(index)}
            />
          ))}
        </XStack>
      </ScrollView>
      <Button
        size='$6'
        icon={Plus}
        position='absolute'
        elevate
        bottom={20}
        right={20}
        onPress={handleNewNote}
      ></Button>
      {openNote > -1 && (
        <View
          height='100%'
          width='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
          onPress={() => setOpenNote(-1)}
        >
          <Note note={notes[openNote]} open />
        </View>
      )}
    </ZStack>
  )
}
