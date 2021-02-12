import { useUsername } from "../contexts/username_context";
import { useWebsocket } from "../contexts/websocket_context";

export const UsernameSelector = () => {
    const { setUsername, setAccepted, username } = useUsername()
    const {send, connected} = useWebsocket()
    
    const onClick = () => {
        setAccepted(true)
        send('set_username', [username]);
    }   

    return ( 
        <div>
            <input type='text' placeholder={username ? username : "Type in your username"} onChange={e => setUsername(e.target.value)} />
            <button onClick={onClick} disabled={!username}>Accept</button>
        </div>
     );
}