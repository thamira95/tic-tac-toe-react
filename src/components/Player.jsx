import { useState } from 'react';

export default function Player({pname, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(pname);
    const [isEditing, setIsEditing] = useState(false);
    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    function handleEditing() {
        setIsEditing(editing => !editing);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }
    return (
        <li className={isActive? 'active': undefined}>
            <span className="player">
                {isEditing ? <input type="text" required value={playerName} onChange={handleChange}/> : 
                <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing}>{isEditing? 'Save' : 'Edit'}</button>
        </li>
    );
}