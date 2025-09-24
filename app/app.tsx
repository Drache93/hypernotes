import { useCallback, useState } from 'react'
import { useAppState } from './contexts'
import {
  XStack,
  ScrollView,
  ZStack,
  Button,
  View,
  Theme,
  Spinner
} from 'tamagui'
import { Plus } from '@tamagui/lucide-icons'
import Note from './components/Note'

export default function App() {
  const { state, action, isReady } = useAppState()
  const [openNote, setOpenNote] = useState(-1)

  const handleNewNote = useCallback(() => {
    // const currentNotes = [...notes]
    // setNotes((notes) => [...notes, { id: Date.now().toString(), content: '' }])
    // setOpenNote(currentNotes.length)

    return action('CREATE_NOTE', {
      id: Date.now().toString(),
      content: '',
      theme: 'blue'
    })
  }, [])

  if (!isReady)
    return (
      <View width='100%' height='100%' backgroundColor='$background'>
        <Spinner size='large' color='$green10' />
      </View>
    )

  return (
    <ZStack height='100%' width='100%'>
      <ScrollView
        height='100%'
        width='100%'
        backgroundColor='$background'
        padding='$4'
      >
        <XStack flex={1} flexWrap='wrap' gap='$4'>
          {state.notes.map((note, index) => (
            <Note
              key={index}
              note={note}
              dimmed={openNote > -1 && openNote !== index}
              onPress={() => {
                action('OPEN_NOTE', note.id)
              }}
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
      {state.currentNote && (
        <View
          height='100%'
          width='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
          onPress={() => action('CLOSE_NOTE')}
        >
          <Note note={state.currentNote} open onChange={(content) => {}} />
        </View>
      )}
    </ZStack>
  )
}
