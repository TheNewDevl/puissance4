import { currentPlayer } from "../../funcs/game"
import { Player, PlayerColor } from "../../types"
import GameInfo from "../components/GameInfo"
import { useGame } from "../hooks/useGame"

type PlayScreenProps = {}

export default function PlayScreen({}: PlayScreenProps) {
  const { context } = useGame()
  const player = currentPlayer(context)

  return (
    <div>
      <GameInfo color={player.color as PlayerColor} name={player.name} />
    </div>
  )
}
