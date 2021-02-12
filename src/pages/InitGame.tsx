import { useState } from "react";
import {Redirect} from 'react-router-dom'
import { useId } from "../contexts/id_context";
import { useUsername } from "../contexts/username_context";
import { UsernameSelector } from "../components/UsernameSelector"
import "../styles/InitGame.css"

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
 * Idea: on this website, we will acquire connection and websocket the shit out o
 */
const InitGame = () => {
    let { id, setId } = useId()
    let [opponent, setOpponent] = useState(false);
    let { username, setUsername, accepted } = useUsername();
    
    if (opponent) {
        return <Redirect to={'/play/' + opponent} />
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