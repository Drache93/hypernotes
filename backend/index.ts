import HRPC from '../spec/hrpc'
import { Hyperstate } from 'hyperstate'
import Corestore from 'corestore'
import URL from 'bare-url'
import fs from 'bare-fs'
import { join } from 'bare-path'

const { IPC } = BareKit // Bare gives us this for free
const rpc = new HRPC(IPC)
const persistentPath = join(URL.fileURLToPath(Bare.argv[0]), 'hypernotes')

// Testing
// if (fs.existsSync(persistentPath)) {
//   fs.rmSync(persistentPath, {
//     recursive: true,
//     force: true
//   })
// }

if (!fs.existsSync(persistentPath)) {
  fs.mkdirSync(persistentPath)
}

const store = new Corestore(persistentPath)
import { definition, Context, Actions } from './machine'

const machine = new Hyperstate(
  store.get({ name: 'state', valueEncoding: 'json' }),
  definition
)

await machine.ready()

Bare.on('teardown', () => machine.close())

rpc.onState(
  async ({ action, payload }: { action: Actions; payload: Context }) => {
    console.log('app action', action, payload)

    // @ts-ignore Why is this never?
    await machine.action(action, payload)

    return {
      // Return current values of the machine
      state: machine.context
    }
  }
)
