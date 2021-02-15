import { useHistory, useParams } from "react-router-dom";
import { UsernameSelector } from "../components/UsernameSelector"
import { parse, useWebsocket } from "../contexts/websocket_context";
import { useEffect, useState } from 'react'
import { useUsername } from "../contexts/username_context";
import { useId } from "../contexts/id_context";

interface RouteParams {
    oid: string;
}

const PlayGame = () => {
    const { id } = useId()
    const { subscribe, send } = useWebsocket()
    const [oppo, setOppo] = useState('<unknown>')
    const { oid } = useParams<RouteParams>()
    const { accepted } = useUsername()
    const history = useHistory()
    
    subscribe((ev: MessageEvent) => {
        const data = parse(ev.data)

        if (data[1] === 'username_of') {
            setOppo(data[2])
        }
    })
    
    useEffect(() => {
        if (id) {
            send('username_of', [oid]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    
    const onAccept = () => {
        history.push('/game/' + oid)
        send('play_with', [oid])
    }
    
    return ( 
        <>
            <UsernameSelector/>
            You have been invited to the game by {oppo}. Accept?
            <button onClick={onAccept} disabled={!accepted || !oppo}>Yes</button>
            <button disabled={true}>No</button>
        </>
    );
}
         
export default PlayGame;