import { Button, makeStyles, Theme, createStyles, Input } from "@material-ui/core";
import { useUsername } from "../contexts/username_context";
import { useWebsocket } from "../contexts/websocket_context";
import DoneIcon from '@material-ui/icons/Done'

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        acceptbtn: {
            color: 'white',
            background: 'green',
            padding: '5px',
            marginTop: '10px',
            width: '100%',
            '&:disabled': {
                background: 'none',
            }
        },
        root: {
            textAlign: 'center'
        },
        input: {
            width: '100%',
        }
    })
)

export const UsernameSelector = () => {
    const { setUsername, setAccepted, username } = useUsername()
    const { send } = useWebsocket()
    const styles = useStyle()
    
    const onClick = () => {
        setAccepted(true)
        send('set_username', [username]);
    }   

    return ( 
        <div className={styles.root}>
            <h1>Please select your username</h1>
            <Input className={styles.input} placeholder={username ? username : "Type in your username"} onChange={e => setUsername(e.target.value)} />
            <br/>
            <Button className={styles.acceptbtn} size='medium' onClick={onClick} disabled={!username}><DoneIcon /> Accept</Button>
        </div>
     );
}