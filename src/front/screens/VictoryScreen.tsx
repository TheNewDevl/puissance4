import { currentPlayer } from "../../funcs/game"
import { PlayerColor } from "../../types"
import Victory from "../components/Victory"
import { useGame } from "../hooks/useGame"

type VictoryScreenProps = {}

function VictoryScreen({}: VictoryScreenProps) {
  const { context, send } = useGame()
  const player = currentPlayer(context)
  const restart = () => send({type: 'restart' })
  return (
    <div>
      <Victory color={player.color as PlayerColor} name={player.name} onRestart={restart} />
    </div>
  )
}

export default VictoryScreen
