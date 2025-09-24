import { createMachine, MachineConfig, Infer } from 'hyperstate'
import type { ThemeName } from 'tamagui'

export interface NoteData {
  id: string
  content: string
  theme: ThemeName
}

export const definition = createMachine({
  initial: 'idle' as const,
  context: {
    currentNote: undefined as NoteData | undefined,
    notes: [] as NoteData[]
  },
  states: {
    starting: {
      on: {
        START: {
          target: 'idle',
          action: (ctx) => {}
        }
      }
    },
    idle: {
      on: {
        CREATE_NOTE: {
          target: 'open',
          action: (ctx, note: NoteData) => {
            ctx.currentNote = note
            ctx.notes.push(note)
          }
        },
        OPEN_NOTE: {
          target: 'open',
          action: (ctx, id: string) => {
            ctx.currentNote = ctx.notes.find((n) => n.id === id)
          }
        }
      }
    },
    open: {
      on: {
        EDIT_NOTE: {
          target: 'open',
          action: (ctx, data: { content: string; theme?: ThemeName }) => {
            ctx.currentNote = { ...ctx.currentNote!, ...data }
            ctx.notes = ctx.notes.map((n: NoteData) =>
              ctx.currentNote?.id === n.id ? ctx.currentNote : n
            )
          }
        },
        CLOSE_NOTE: {
          target: 'idle',
          action: (ctx) => {
            ctx.currentNote = undefined
          }
        }
      }
    }
  }
})

export type ExtractContext<T> =
  T extends MachineConfig<infer C, any> ? C : never

export type ExtractStates<T> =
  T extends MachineConfig<any, infer S> ? keyof S : never

export type States = ExtractStates<typeof definition>
export type Actions = 'CREATE_NOTE' | 'OPEN_NOTE' | 'EDIT_NOTE' | 'CLOSE_NOTE'
export type Context = ExtractContext<typeof definition>

// export type State = typeof machine.context
