import { useCallback, useState } from 'react'
import { useAppState } from './contexts'
import {
  XStack,
  ScrollView,
  ZStack,
  Button,
  View,
  Theme,
  Spinner,
  Text,
  useTheme
} from 'tamagui'
import { MailWarning, Plus } from '@tamagui/lucide-icons'
import MasonryList from '@react-native-seoul/masonry-list'
import Note from './components/Note'

export default function App() {
  const { state, action, isReady } = useAppState()
  const theme = useTheme()

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
      <MasonryList
        height='100%'
        width='100%'
        containerStyle={{
          backgroundColor: theme.background.val,
          paddingTop: 24
        }}
        padding='$4'
        data={state.notes}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignSelf: 'stretch'
        }}
        renderItem={({ item, i }) => (
          <Note
            style={{
              marginLeft: i % 2 === 0 ? 0 : 6,
              marginRight: i % 2 === 0 ? 6 : 0,
              marginBottom: 12
            }}
            dimmed={
              state.currentNote && state.currentNote.id !== (item as any).id
            }
            selected={
              state.currentNote && state.currentNote.id === (item as any).id
            }
            note={item as any}
            onPress={() => {
              action('OPEN_NOTE', (item as any).id)
            }}
            // onLongPress={() => {}}
          />
        )}
      />
      {/*<XStack flex={1} flexWrap='wrap' gap='$4'>
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
        </XStack>*/}
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
