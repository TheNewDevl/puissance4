import { GameStates, PlayerColor } from "../types"
import ColorSelector from "./components/ColorSelector"
import Grid from "./components/Grid"
import NameSelector from "./components/NameSelector"
import GameInfo from "./components/GameInfo"
import Victory from "./components/Victory"
import { useGame } from "./hooks/useGame"
import LobbyScreen from "./screens/LobbyScreen"
import PlayScreen from "./screens/PlayScreen"
import { currentPlayer } from "../funcs/game"
import VictoryScreen from "./screens/VictoryScreen"
import DrawScreen from "./screens/DrawScreen"

function App() {
  const { state, context, send } = useGame()

  const canDrop = state === GameStates.PLAY
  
  const player = canDrop ? currentPlayer(context) : undefined
  const dropToken = canDrop ? (x: number) => {
    send({type: "dropToken", x: x})
  } : undefined

  return (
      <div className="container">
        {state === GameStates.LOBBY && <LobbyScreen />}
        {state === GameStates.PLAY && <PlayScreen />}
        {state === GameStates.VICTORY && <VictoryScreen />}
        {state === GameStates.DRAW && <DrawScreen />}

        <Grid winningPositions={context.winningPositions} grid={context.grid} onDrop={dropToken} color={player?.color as PlayerColor}  />
      </div>
    )
}

export default App
