import { Button, Card, debounce, Input, Theme, useTheme, XGroup } from 'tamagui'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { NoteData } from '@/backend/machine'
import { useAppState } from '../contexts'
import { Circle } from '@tamagui/lucide-icons'
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native'
import {
  RichText,
  Toolbar,
  useEditorBridge,
  darkEditorTheme,
  CoreBridge,
  TenTapStartKit,
  darkEditorCss
} from '@10play/tentap-editor'

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
  style
}: NoteProps) {
  const { state, action, isReady } = useAppState()
  const theme = useTheme()

  const editor = useEditorBridge({
    autofocus: open,
    avoidIosKeyboard: true,
    initialContent: note.content,
    editable: open,
    dynamicHeight: true,
    onChange: debounce(async () => {
      if (!open) return

      const content = await editor.getHTML()
      action('EDIT_NOTE', { content })
    }, 500),
    theme: {
      colorKeyboard: {
        keyboardRootColor: '#313132',
        scrollViewContainer: {
          backgroundColor: '#313132'
        },
        colorButton: {
          borderColor: '#4B4B4C',
          backgroundColor: '#4B4B4C'
        },
        activeButton: {
          borderColor: 'white'
        },
        iconContainer: {
          backgroundColor: '#8C8C8D',
          shadowColor: '#898989'
        },
        colorText: {
          color: 'white'
        },
        sectionTitle: {
          color: '#CACACA'
        },
        colorSelection: [
          {
            name: 'Default',
            displayColor: 'white',
            value: undefined
          },
          {
            name: 'Red',
            value: '#E5112B'
          },
          {
            name: 'Yellow',
            value: '#FFEE32'
          },
          {
            name: 'Orange',
            value: '#F18200'
          },
          {
            name: 'Blue',
            value: '#006ED3'
          },
          {
            name: 'Green',
            value: '#07CE61'
          },
          {
            name: 'Purple',
            value: '#9D4EDD'
          },
          {
            name: 'Pink',
            value: '#FF77A1'
          },
          {
            name: 'Black',
            value: '#000000'
          }
        ],
        highlightSelection: [
          {
            name: 'Default',
            displayColor: '#E5E5E580',
            value: undefined
          },
          {
            name: 'Red',
            value: '#E5112B4D'
          },
          {
            name: 'Yellow',
            value: '#FFEE324D'
          },
          {
            name: 'Orange',
            value: '#F182004D'
          },
          {
            name: 'Blue',
            value: '#006ED34D'
          },
          {
            name: 'Green',
            value: '#07CE614D'
          },
          {
            name: 'Purple',
            value: '#9D4EDD4D'
          },
          {
            name: 'Pink',
            value: '#FF77A14D'
          },
          {
            name: 'Black',
            value: '#0000004D'
          }
        ]
      },
      toolbar: {
        toolbarBody: {
          borderTopColor: '#C6C6C6B3',
          borderBottomColor: '#C6C6C6B3',
          backgroundColor: '#474747'
        },
        toolbarButton: {
          backgroundColor: theme.background.val
        },
        iconDisabled: {
          tintColor: '#CACACA'
        },
        iconWrapperActive: {
          backgroundColor: theme.blue3.val
        },
        iconWrapper: {
          borderRadius: 4,
          backgroundColor: theme.blue1.val
        },
        hidden: {
          display: 'none'
        },
        icon: {
          tintColor: 'white'
        },
        linkBarTheme: {
          addLinkContainer: {
            backgroundColor: '#474747',
            borderTopColor: '#939394',
            borderBottomColor: '#939394'
          },
          linkInput: {
            backgroundColor: '#474747',
            color: 'white'
          },
          placeholderTextColor: '#B2B2B8',
          doneButton: {
            backgroundColor: '#0085FF'
          },
          doneButtonText: {
            color: 'white'
          },
          linkToolbarButton: {}
        }
      }
    },
    bridgeExtensions: [
      ...TenTapStartKit,
      CoreBridge.configureCSS(`* {
        color: white;
      }
      blockquote {
        border-left: 3px solid ${theme.blue3.val};
        padding-left: 1rem;
      }
      input[type="checkbox"] {
        appearance: none;
        width: 16px;
        height: 16px;
        border: 2px solid ${theme.background.val};
        border-radius: 3px;
        background: ${theme.background.val};
        margin-right: 8px;
        position: relative;
        cursor: pointer;
      }
      input[type="checkbox"]:checked {
        background-color: ${theme.background.val};
        border-color: ${theme.blue2.val};
      }
      input[type="checkbox"]:checked::after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 12px;
        top: -2px;
        left: 1px;
      }
      .highlight-background {
        background-color: #474749;
      }`)
    ]
  })

  useEffect(() => {
    // Refresh the data on the selected note
    if (!selected) {
      return
    }
    editor.setContent(note.content)
  }, [note.content])

  return (
    <Theme name={note.theme ?? 'blue'}>
      <Card
        style={style}
        key={note.id}
        elevate={!dimmed}
        bordered
        animation='bouncy'
        width={open ? '75%' : undefined}
        height={
          open ? '50%' : Math.min(Math.max(note.content.length * 1.5, 100), 300)
        }
        minHeight={100}
        opacity={dimmed ? 0.3 : selected ? 0 : 1}
        scale={dimmed ? 0.95 : selected ? 0 : 1}
        onPress={() => onPress?.(note)}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <RichText
          editor={editor}
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            height: '100%'
          }}
          containerStyle={{
            width: '100%',
            height: '100%',
            flex: 1,
            padding: open ? 24 : 12
          }}
        />
        {open && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              width: '100%',
              height: 60
            }}
          >
            <Toolbar editor={editor} />
          </KeyboardAvoidingView>
        )}
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
