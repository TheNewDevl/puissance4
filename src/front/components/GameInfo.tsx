import React from 'react'
import PropTypes from 'prop-types'
import { discColorClass } from '../../funcs/color';
import { PlayerColor } from '../../types';

type GameInfoProps = {
  color: PlayerColor, 
  name: string
};

function GameInfo({color, name}: GameInfoProps) {
  return (
    <div>
      <h2 className='flex' style={{gap: '0.5rem'}}> Au tour de {name} <div className={discColorClass(color)}></div> de jouer</h2>
    </div>
  )
}

export default GameInfo
