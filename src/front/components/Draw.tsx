import { PlayerColor } from '../../types';
import { prevent } from '../../funcs/dom';

type DrawProps = {
  onRestart?: () => void
};

function Draw({onRestart}: DrawProps) {
  return (
    <div className='flex' style={{justifyContent: "space-between"}}>
      <h2 className='flex' style={{gap: '0.5rem'}}> Domage, égalité !</h2>
      <button 
        className='button' 
        onClick={prevent(onRestart)}
        >Rejouer</button>
    </div>
  )
}

export default Draw
