import HRPC from '../spec/hrpc'
const { IPC } = BareKit // Bare gives us this for free
const rpc = new HRPC(IPC) as HypernotesHRPC

rpc.onState(({ action }) => {
  console.log('app action', action)

  return {
    state: {
      hello: 'world'
    }
  }
})
