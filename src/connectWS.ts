export interface WsOption {
  uri: string
  type?: string
  host?: string
  receive: (data: unknown) => void
}

export default (option: WsOption) => {
  console.log(`Connecting to ${option.uri} ...`)

  const ws = new globalThis.WebSocket(option.uri)

  ws.onopen = (ev) => {
    console.log('RTServer Connection Created!')

    if (option.type) {
      ws.send(JSON.stringify({
        type: option.type,
        data: 'Set Request Type',
      }))
    }

    if (option.host) {
      ws.send(JSON.stringify({
        type: option.type,
        data: option.host,
      }))
    }
  }

  ws.onmessage = (ev) => {
    option.receive(ev.data)
  }

  ws.onclose = (ev) => {
    console.log('RTServer Connection Closed!')
  }

  ws.onerror = (ev) => {
    console.log('RTServer Connection Broken!')
    throw ev
  }

  return ws
}
