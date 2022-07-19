import { CSSProperties } from "react"
import { discColorClass } from "../../funcs/color"
import { prevent } from "../../funcs/dom"
import { CellState, GridState, PlayerColor } from "../../types"

type GridProps = {
  grid: GridState, 
  color?: PlayerColor, 
  onDrop? : (x: number) => void
}

function Grid({grid, color, onDrop}: GridProps) {
  const cols = grid[0].length
  const showColumns = color && onDrop
  return (
    <div 
      className="grid"
      style={{"--rows": grid.length, "--cols": cols} as CSSProperties}
      >
      {grid.map((row, y) => row.map((c, x) => (
        <Cell 
          x={x}
          y={y}
          color={c}
          key={`${x}-${y}`}
        
        />
        )))}
        {showColumns && <div className="columns">
          {new Array(cols).fill(1).map((_, k) => <Column onDrop={() => onDrop(k)} color={color} key={k}/>)}
        </div>}
        
    </div>
  )
}

export default Grid

type CellProps = {
  x: number, 
  y: number, 
  color: CellState
}
function Cell({y, color} : CellProps){
console.log(y)
  return (
    <div 
      className={discColorClass(color)}
      style={{"--row": String(y)} as CSSProperties}
      />
  )

}

type ColumnProps = {
  color: PlayerColor, 
  onDrop: () => void

}
function Column({color, onDrop}: ColumnProps){
  return <button onClick={prevent(onDrop)} className="column">
    <div className={discColorClass(color)}></div>
  </button>
}