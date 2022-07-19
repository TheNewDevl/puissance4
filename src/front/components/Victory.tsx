import React from 'react'
import PropTypes from 'prop-types'
import { discColorClass } from '../../funcs/color';
import { PlayerColor } from '../../types';
import { prevent } from '../../funcs/dom';

type VictoryProps = {
  color: PlayerColor, 
  name: string, 
  onRestart?: () => void
};

function Victory({color, name, onRestart}: VictoryProps) {
  return (
    <div className='flex' style={{justifyContent: "space-between"}}>
      <h2 className='flex' style={{gap: '0.5rem'}}> Bravo !  {name} <div className={discColorClass(color)}></div> a gagné !</h2>
      <button 
        className='button' 
        onClick={prevent(onRestart)}
        >Rejouer</button>
    </div>
  )
}

export default Victory
