import { Container } from "@material-ui/core";
import { Component } from "react";
import { parse, WebsocketContext, WebsocketContextValue } from "../contexts/websocket_context";
import { ws } from '../contexts/websocket_context'

import styles from '../styles/Game.module.css'

const BoardCell = ({ value, callback, active }: { active: boolean; value: number; callback: () => void}) => {
    const text = ((v) : string => {
        if (v === 0) return '-';
        else if (v === 1) return 'X';
        else return 'O'
    })(value)

    return (
        <> 
            <button className={styles.item} onClick={callback} disabled={!active}>{text}</button>
        </>
    )
}

const ErrorDisplay = ({ err }: { err: string;}) => {
    if(err)
        return (<div className={styles.error}>{err}</div>);
    else
        return <></>
}


interface StateType {
    opponent: string;
    board: number[];
    err: string;
    turn: boolean;
    element: number;
}
 
class GameClass extends Component {
    state = {
        opponent: 'unknown',
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        err: '',
        turn: false,
        element: 1,
    }
    
    componentDidMount() {
        ws.addEventListener('message', this.subscribe.bind(this)) 
    }
    
    componentWillUnmount() {
        ws.removeEventListener('message', this.subscribe.bind(this)) 
    }
    
    subscribe(ev: MessageEvent) {
        const [_, command, params] = parse(ev.data);
        let prevent = true;

        if (command === 'game_info') {
            const [opponentName, element] = params.split(',');
            this.onInfo(opponentName, parseInt(element))
        } else if (ev.data === 'your_turn') {
            this.set((s: StateType) => {
                s.turn = true;
            })
        } else if (command === 'played') {
            const [x, y] = params.split(',')
            const i = parseInt(x) + 3 * parseInt(y)
            this.updateBoard(i, this.state.element === 1 ? 2 : 1);
        } else if (command === 'finished') {
            // redirect to something that indicates what is the result
            console.log(params);
        } else if (command === "error") {
            this.onError(params)
        } else {
            prevent = false;
        }
    
        if (prevent) {
            ev.preventDefault()
            ev.stopPropagation()
        }
    }
    
    onError(err: string) {
        this.set((s: StateType) => {
            s.err = err
            s.turn = true
        })
    }
    
    updateBoard(i: number, element: number) {
        this.set((s: StateType) => {
            s.board[i] = element
            s.turn = false
            s.err = ''
        })
    }
    
    onInfo(opponentName: string, element: number) {
        this.set((s: StateType) => {
            s.opponent = opponentName
            s.element = element
        })
    }
    
    set(callback: (a: StateType) => void) {
        callback(this.state)
        this.setState(this.state)
    }
    
    callback({send}: WebsocketContextValue, i: number) {
        return () => {
            this.updateBoard(i, this.state.element)
            this.set((s: StateType) => s.turn = false)
            const y = Math.floor(i / 3);
            const x = i % 3;
            send('play_on', [x.toString(), y.toString()])
        }
    }

    render() { 
        return (  
        <Container maxWidth="sm">
            <ErrorDisplay err={this.state.err}/>
            <p>Playing against {this.state.opponent}</p>
            <div className={styles.board}>
                <WebsocketContext.Consumer>
                        {
                            value => this.state.board.map((a, i) =>
                                <BoardCell
                                    value={a}
                                    key={i}
                                    callback={this.callback(value, i)}
                                    active={a === 0 && this.state.turn} />)
                        }
                </WebsocketContext.Consumer>
            </div>
        </Container>
        )
    }
}
 
export default GameClass;