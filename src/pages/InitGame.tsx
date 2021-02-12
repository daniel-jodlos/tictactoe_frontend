import { useState } from "react";
import {Redirect} from 'react-router-dom'
import { useId } from "../contexts/id_context";
import { useUsername } from "../contexts/username_context";
import { UsernameSelector } from "../components/UsernameSelector"
import "../styles/InitGame.css"
import { useWebsocket } from "../contexts/websocket_context";
import { parse } from '../contexts/websocket_context'

const UsernameDisplay = () => {
    let {username, setAccepted} = useUsername()
    return (
        <>
            <div>Your username is: {username}</div>
            <button onClick={() => setAccepted(false)}>Change</button>
        </>
    )
}

/**
 * Idea: on this website, we will acquire connection and websocket the shit out of if
 */
const InitGame = () => {
    let { id } = useId()
    let [opponent, setOpponent] = useState('');
    let { accepted } = useUsername();
    let { subscribe } = useWebsocket()
    
    subscribe((ev: MessageEvent) => {
        const data = parse(ev.data)
        if (data[1] === 'play_with') {
            setOpponent(data[2]);
            console.log("Received redierct request");
        }
    })
    
    if (opponent.length > 0) {
        return <Redirect to={'/game/' + opponent} />
    } else {
        return (
            <>
                { !accepted ? <UsernameSelector /> : <UsernameDisplay/>}
                { (id && accepted) ? <div className='url'>{process.env.PUBLIC_URL}/play/{id}</div> : <></>}
            </>
        );
    }
}
 
export default InitGame;