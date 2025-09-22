interface HypernotesState {
  hello?: string
}

interface HypernotesAction {
  hello?: string
}

interface HypernotesHRPC {
  state: (data: {
    action: HypernotesAction
  }) => Promise<{ state: HypernotesState }>
  onState: (
    callback: (data: { action: HypernotesAction }) => { state: HypernotesState }
  ) => void
}

declare var BareKit: any
