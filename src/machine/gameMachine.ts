import { interpret, InterpreterFrom } from 'xstate';
import { createModel } from "xstate/lib/model"
import { GameContext, GridState, Player, GameStates, Position, PlayerColor } from '../types';
import { chooseColorAction, dropTokenAction, joinGameAction, leaveGameAction, restartAction, saveWinningPositionsAction, setCurrentPlayerAction, switchPlayerAction } from './actions';
import { canChooseColorGuard, canDropGuard, canJoinGuard, canLeaveGuard, canStartGameGuard, isDrawMoveGuard, isWinningMoveGuard } from './guards';



export const GameModel = createModel({
  players: [] as Player[],
  currentPlayer: null as null | Player['id'],
  rowLength: 4,
  winningPositions: [] as Position[],
  grid:[
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
      ["E", "E", "E", "E", "E", "E", "E"],
  ] as GridState
}, {
  events:{
    join: (playerId: Player["id"], name: Player['name']) => ({playerId, name}),
    leave: (playerId: Player["id"]) => ({playerId}),
    chooseColor: (playerId: Player["id"], color: Player["color"]) => ({playerId, color}),
    start: (playerId: Player["id"],) => ({playerId}),
    dropToken: (playerId: Player["id"], x: number) => ({playerId, x}),
    restart: (playerId: Player["id"]) => ({playerId}),
  }
})

export function makeGame (state: GameStates = GameStates.LOBBY, context: Partial<GameContext> = {}): InterpreterFrom<typeof GameMachine>{
  const machine =  interpret(
    GameMachine.withContext({
      ...GameModel.initialContext, 
      ...context
    })
  ).start()
    machine.state.value = state
    return machine 
}

export const GameMachine = GameModel.createMachine({
  id: 'game',
  context: {...GameModel.initialContext, 
    players: [{
      id: 'Carlos', 
      name: "Carlos", 
      color: PlayerColor.YELLOW
    }, {
      id: 'Michael', 
      name: "Michael", 
      color: PlayerColor.RED
    }], 
    currentPlayer: 'Carlos'
  },
  initial: GameStates.PLAY,
  states:{
    [GameStates.LOBBY]: {
      on: {
        join: {
          cond: canJoinGuard,
          actions: [GameModel.assign(joinGameAction)],
          target: GameStates.LOBBY,
        },
        leave: {
          cond: canLeaveGuard,
          actions: [GameModel.assign(leaveGameAction)],
          target: GameStates.LOBBY,
        },
        chooseColor: {
          cond: canChooseColorGuard,
          target: GameStates.LOBBY,
          actions: [GameModel.assign(chooseColorAction)],

        }, 
        start: {
          cond: canStartGameGuard,
          actions: [GameModel.assign(setCurrentPlayerAction)],
          target: GameStates.PLAY,
       }
      }, 
    }, 
    [GameStates.PLAY]: {
      after:{
        20000:{
          target: GameStates.PLAY, 
          actions: [GameModel.assign(switchPlayerAction)]
        }
      },
      on: {
        dropToken: [
          {
            cond: isDrawMoveGuard, 
            target: GameStates.DRAW, 
            actions: [GameModel.assign(dropTokenAction)],

          },
          {
            cond: isWinningMoveGuard, 
            target: GameStates.VICTORY, 
            actions: [GameModel.assign(saveWinningPositionsAction), GameModel.assign(dropTokenAction)],

          },
          {
          cond: canDropGuard,
          actions: [GameModel.assign(dropTokenAction), GameModel.assign(switchPlayerAction)],
          target: GameStates.PLAY
        }]
      }
    }, 
    [GameStates.VICTORY]: {
      on: {
        restart: {
          target: GameStates.LOBBY,
        }
      }
    },
    [GameStates.DRAW]: {
      on: {
        restart: {
          target: GameStates.LOBBY,
          actions: [GameModel.assign(restartAction)]
        }
      }
    }
  }, 
})