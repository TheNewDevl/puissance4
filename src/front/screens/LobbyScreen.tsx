import { prevent } from "../../funcs/dom"
import { PlayerColor } from "../../types"
import ColorSelector from "../components/ColorSelector"
import NameSelector from "../components/NameSelector"
import { useGame } from "../hooks/useGame"

type LobbyScreenProps ={}

function LobbyScreen({}: LobbyScreenProps) {
  const {send, context, can} = useGame()
  const colors = [PlayerColor.RED, PlayerColor.YELLOW]

  const jointGame = (name: string) => send({ type: 'join', name: name, playerId: name })
  const chooseColor = (color: PlayerColor) => send({
    type: 'chooseColor', 
    playerId: color === PlayerColor.YELLOW ? "Carlos" : "Michael", 
    color, 
    })
  const startGame = () => send({type: 'start',})

  const canStart = can({type: 'start'})

  return (
    <div>
      <NameSelector onSelect={jointGame} />
      <ColorSelector onSelect={chooseColor} players={context.players} colors={colors} />
      <button disabled={!canStart} className="button" onClick={prevent(startGame)}>Démarrer</button>
    </div>
  )
}

export default LobbyScreen
