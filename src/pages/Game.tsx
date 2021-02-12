import { useState } from "react";
import { useParams } from "react-router-dom";
import { setEmitFlags } from "typescript";
import { parse, useWebsocket } from "../contexts/websocket_context";

import '../styles/Game.css'

interface RouteParams {
    id: string;
}

const BoardCell = ({ value, callback, active }: { active: boolean; value: number; callback: () => void}) => {
    const text = ((v) : string => {
        if (v === 0) return '-';
        else if (v === 1) return 'X';
        else return 'O'
    })(value)

    return (
        <> 
            <button className="item" onClick={callback} disabled={!active}>{text}</button>
        </>
    )
}

const Game = () => {
    const { id } = useParams<RouteParams>()
    const [turn, setTurn] = useState(true)
    const [board, setBoard] = useState([0,0,0,0,0,0,0,0,0])
    const [opponent, setOpponent] = useState('unknown')
    const [element, setElement] = useState(0)
    const {subscribe, send} = useWebsocket()
    
    function updateBoard(i: number, value: number) {
        let b = Object.create(board)
        b[i] = value
        setBoard(b)
    }
    
    const callback = (i: number) => () => {
        updateBoard(i, element)
        setTurn(false)
    }
    
    subscribe((ev: MessageEvent) => {
        const [_, command, params] = parse(ev.data);

        if (command === 'game_info') {
            const [opponentName, element] = params.split(',');
            setOpponent(opponentName)
            setElement(parseInt(element))
        } else if (command === 'your_turn') {
            setTurn(true)
        } else if (command === 'played') {
            const [x,y] = params.split(',')
            const i = parseInt(x) + 3*parseInt(y)
            updateBoard(i, element === 1 ? 2 : 1);
        }
    })
    
    
    return ( 
        <>
            <div className="board">
                {board.map((a, i) => <BoardCell value={a} key={i} callback={callback(i)} active={ a === 0 && turn }/>)}
            </div>
        </>
     );
}
 
export default Game;