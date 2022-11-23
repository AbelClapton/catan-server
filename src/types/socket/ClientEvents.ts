import { TradeProposal } from '../game'

export interface ClientEvents {
  'lobby:join': () => void
	'lobby:leave': () => void
	'match:ready': () => void
	'match:leave': () => void

	// in-game actions
	'match:tossDices': () => void
	'match:proposeTrade': (payload: TradeProposal) => void
	'match:cancelTrade': () => void
	'match:acceptTrade': () => void
	'match:declineTrade': () => void
	'match:negotiateTrade': () => void
	'match:exchange': (payload: TradeProposal) => void
	'match:buildSettlement': () => void
	'match:buildCity': () => void
	'match:buildRoad': () => void
	'match:buyDevelopmentCard': () => void
	'match:useDevelopmentCard': (payload: { cardId: number }) => void
	'match:moveThief': (payload: { tileId: number }) => void
	'match:passTurn': () => void
}
