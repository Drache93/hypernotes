// @ts-ignore
import HRPCBuilder from 'hrpc'
// @ts-ignore
import Hyperschema from 'hyperschema'
import path from 'path'

const SCHEMA_DIR = path.join(__dirname, 'spec', 'hyperschema')
const HRPC_DIR = path.join(__dirname, 'spec', 'hrpc')

// register schema
const schema = Hyperschema.from(SCHEMA_DIR)
const schemaNs = schema.namespace('hypernotes')

schemaNs.register({
  name: 'state-request',
  fields: [
    { name: 'payload', type: 'json' },
    { name: 'action', type: 'string' }
  ]
})

schemaNs.register({
  name: 'state-response',
  fields: [{ name: 'state', type: 'json' }]
})
Hyperschema.toDisk(schema)

// Load and build interface
const builder = HRPCBuilder.from(SCHEMA_DIR, HRPC_DIR)
const ns = builder.namespace('hypernotes')

// Register commands
ns.register({
  name: 'state',
  request: { name: '@hypernotes/state-request', stream: false },
  response: { name: '@hypernotes/state-response', stream: false }
})

// Save interface to disk
HRPCBuilder.toDisk(builder)
