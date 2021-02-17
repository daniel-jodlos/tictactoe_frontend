import { useState } from "react";
import {Redirect} from 'react-router-dom'
import { useId } from "../contexts/id_context";
import { useUsername } from "../contexts/username_context";
import { UsernameSelector } from "../components/UsernameSelector"
import { useWebsocket } from "../contexts/websocket_context";
import { parse } from '../contexts/websocket_context'
import { createStyles, Button, makeStyles } from "@material-ui/core";

import styles from "../styles/InitGame.module.css"
import ServerDown from "../components/ServerDown";
import theme from "../contexts/theme";

const useDisplayStyle = makeStyles(theme => createStyles({
    root: {
        textAlign: 'center'
    },
    btn: {
        width: '100%',
        padding: '10px',
        color: 'gray',
        fontSize: '0.5rem'
    },
    heading: {
        
    },
    username: {
        display: 'inline-block',
        width: '100%', 
        padding: '10px',
        border: `solid 2px ${theme.palette.primary.dark}`,
        borderRadius: '10px',
        fontWeight: 'bolder'
    }
}))

const UsernameDisplay = () => {
    let { username, setAccepted } = useUsername()
    const styles = useDisplayStyle()
    return (
        <div className={styles.root}>
            <h1 className={styles.heading}>Your glorious username is</h1>
            <div className={styles.username}>{username}</div>
            <Button className={styles.btn} onClick={() => setAccepted(false)}>Change</Button> 
        </div>
    )
}


const URL = () => {
    let { username, accepted } = useUsername()
    let { id } = useId()
    if(username && accepted) {
        return (
            <>
                <div
                    style={{
                        backgroundColor: 'darkviolet',
                        color: 'white',
                        padding: '10px',
                        fontWeight: 'bolder',
                        textAlign: 'center'
                    }}
                >{process.env.PUBLIC_URL}/create/{id}</div>
            </>
        )
    } else {
        return <></>
    }
}


/**
 * Idea: on this website, we will acquire connection and websocket the shit out of if
 */
const CreateGamePage = () => {
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
                { !accepted ? <UsernameSelector /> : <UsernameDisplay />}
                <URL/>
                {!id ? <ServerDown/> : <></>}
            </>
        );
    }
}
 
export default CreateGamePage;