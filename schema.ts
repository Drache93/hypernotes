import HRPCBuilder from 'hrpc'
import Hyperschema from 'hyperschema'
import path from 'path'

const SCHEMA_DIR = path.join(__dirname, 'spec', 'hyperschema')
const HRPC_DIR = path.join(__dirname, 'spec', 'hrpc')

// register schema
const schema = Hyperschema.from(SCHEMA_DIR)
const schemaNs = schema.namespace('hypernotes')

schemaNs.register({
  name: 'hello-request',
  fields: [{ name: 'world', type: 'string' }]
})

schemaNs.register({
  name: 'hello-response',
  fields: [{ name: 'message', type: 'string' }]
})
Hyperschema.toDisk(schema)

// Load and build interface
const builder = HRPCBuilder.from(SCHEMA_DIR, HRPC_DIR)
const ns = builder.namespace('hypernotes')

// Register commands
ns.register({
  name: 'hello',
  request: { name: '@hypernotes/hello-request', stream: false },
  response: { name: '@hypernotes/hello-response', stream: false }
})

// Save interface to disk
HRPCBuilder.toDisk(builder)
