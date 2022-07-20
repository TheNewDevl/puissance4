import Draw from "../components/Draw"
import { useGame } from "../hooks/useGame"

type DrawScreenProps = {}

export default function DrawScreen({}: DrawScreenProps) {
  const { send } = useGame()
  const restart = () => send({type: 'restart' })
  return (
    <div>
      <Draw onRestart={restart} />
    </div>
  )
}