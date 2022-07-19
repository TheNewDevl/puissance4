import { PlayerColor } from "../types"
import ColorSelector from "./components/ColorSelector"
import Grid from "./components/Grid"
import NameSelector from "./components/NameSelector"
import GameInfo from "./components/GameInfo"
import Victory from "./components/Victory"

function App() {

  return (
      <div className="container">
        <NameSelector onSelect={() => null } />
        <hr />
        <ColorSelector 
          onSelect={()=> null} players={[{
            id: '1', 
            name: "jojo", 
            color: PlayerColor.RED

            }, {
            id: '2', 
            name: "bar", 
            color: PlayerColor.YELLOW

            }
          ]} 
          colors={[PlayerColor.RED, PlayerColor.YELLOW]} />
          <hr />

        <GameInfo  
          color={PlayerColor.RED}
          name="Joueur 1"
        />
        <Victory  
          color={PlayerColor.RED}
          name="Joueur 1"
        />
        <Grid 
          color= {PlayerColor.RED}
          onDrop={() => null}
          grid={[
            ["E", "E", "E", "E", "E", "E", "R"],
            ["E", "E", "E", "E", "E", "R", "Y"],
            ["E", "E", "E", "E", "E", "R", "R"],
            ["E", "E", "E", "E", "E", "R", "Y"],
            ["E", "E", "E", "E", "E", "Y", "R"],
            ["E", "E", "E", "E", "E", "Y", "Y"],
      ]} />        
      </div>
    )
}

export default App
