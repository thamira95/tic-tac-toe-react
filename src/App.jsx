import { useState } from 'react'
import GameBoard from './components/GameBoard.jsx'
import Player from './components/Player.jsx'
import {WINNING_COMBINATIONS} from './winning-combinations.js'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveWinner(players, gameBoard) {
  let winner = null;
  for(const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSymbol && firstSymbol==secondSymbol && firstSymbol==thirdSymbol) {
      winner=players[firstSymbol];
    }
  }
  return winner;
}

function deriveActivePlayer(prevTurns) {
  let currentPlayer = 'X';
  if(prevTurns.length>0 && prevTurns[0].player==='X') {
    currentPlayer='O';
  }
  return currentPlayer;
}
function App() {  
  let gameBoard = [...initialGameBoard.map((rows)=>[...rows])];
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const hasDraw = gameTurns.length == 9 && !winner;
  
  for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row,col} = square;
    gameBoard[row][col]=player;
  }

  const winner = deriveWinner(players, gameBoard);

  function handlePlayerChange(rowIndex, colIndex) {
    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
      return updatedTurns;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers)=> {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player pname={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
          <Player pname={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectChange={handlePlayerChange} board={gameBoard}/>
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  )
}

export default App
