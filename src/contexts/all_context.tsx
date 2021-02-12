import { IDProvider } from './id_context'
import { UsernameProvider } from './username_context'
import { FunctionComponent } from 'react' 
import { WebsocketContextProvider } from './websocket_context'


export const StateProvider: FunctionComponent<any> = (props: any) => {
    return (
        <IDProvider >
            <UsernameProvider>
                <WebsocketContextProvider>
                    {props.children}
                </WebsocketContextProvider> 
            </UsernameProvider>
        </IDProvider>
    )
}