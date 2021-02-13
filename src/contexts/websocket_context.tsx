import React, { useState, useMemo, useContext } from 'react'
import { useId } from './id_context'

export interface WebsocketContextValue {
    connected: boolean;
    send: (cmd: string, params: string[]) => void;
    subscribe: (callback: (ev: MessageEvent) => void) => void;
    unsubscribe: (callback: (ev: MessageEvent) => void) => void;
}

export const WebsocketContext = React.createContext<WebsocketContextValue>({
    connected: false,
    send: (cmd: string, params: string[]) => { throw new Error("Undefined shit") },
    subscribe: (_) => { },
    unsubscribe: (_) => { },
})
export let ws: WebSocket;

export function parse(msg: string) {
    return msg.split(';')
}

function setupWebsocket(setId: (_: string) => void, setConnected: (_: boolean) => void) {
    ws = new WebSocket('ws://localhost:9003')

    ws.addEventListener('message', (msg: MessageEvent) => {
        const data = parse(msg.data)
        console.log(msg.data);
        

        if (data[1] === 'id') {
            setId(data[0])
            console.log('Socket connected');
            msg.preventDefault()
            setConnected(true)
        }
    })

    ws.addEventListener('open', (_ev: Event) => {
        ws.send('requests_id')
    })

    ws.addEventListener('close', () => {
        setConnected(false)
    })

    ws.onerror = (ev: Event) => {
        ws.close()
        console.error(ev)
    }
}

export function WebsocketContextProvider(props: any) {
    const { setId, id } = useId()
    const [connected, setConnected] = useState(false)
    if (!ws) {
        setupWebsocket(setId, setConnected)
    }
    const value = useMemo((): WebsocketContextValue => {
        return {
            connected,
            send: (cmd: string, params: string[]) => {
                console.log("Invoked send");
                
                const msg = id + ';' + cmd + ';' + params.join(',')
                console.log(ws);
                ws.send(msg)
                console.log("Sent " + msg);
                
            },
            subscribe: (callback: ((msg: MessageEvent) => void)) => {
                ws.addEventListener('message', callback)
            },
            unsubscribe: (callback: ((msg: MessageEvent) => void)) => {
                ws.removeEventListener('message', callback)
            }
        }
    }, [connected, id])

    return <WebsocketContext.Provider value={value} {...props} />;
}

export function useWebsocket() {
    return useContext(WebsocketContext)
}