import { Server, Socket } from 'socket.io'
import { tossDice } from '../helpers'
import { matches } from '../data'
import { Player } from '../models/game/Player'

const colors = ['red', 'blue', 'green']

export const registerMatchHandler = (io: Server, socket: Socket) => {

	const findMatch = (matchId: string) => {
		return matches.find(m => m.id === matchId)
	}

	const startMatch = (matchId: string) => {
		console.log(`Match ${matchId}: Starting game`) 
		socket.in(matchId).emit('match:start', findMatch(matchId)?.players)
	}

	const verifyClients = (matchId: string) => {
		const playersReady = findMatch(matchId)?.players.length || 0
		console.log(`Match ${matchId}: ${playersReady} of 3 ready`)

		if (playersReady < 3) return
		startMatch(matchId)
		console.log(`Match ${matchId}: players ready`)
	}

	const clientReady = (matchId: string, ack: (response: { playerId: string }) => void) => {
		console.log(`User ${socket.id} is ready`)
		const match = findMatch(matchId)
		match?.players.push(new Player(socket.id, socket.data.username, colors[match.players.length]))
		ack({
			playerId: socket.id
		})

		verifyClients(matchId)
	}

	const clientLeft = () => {
		return
	}

	const tossDices = (gameId: string) => {
		const dices = [tossDice(), tossDice()]
		const tossResult = dices[0] + dices[1]

		// find tiles with tossResult
		// find settlements and cities adjacent to the tiles
		// check for thief status
		// update player resources accordingly 
		// 	(+1 resource per adjacent settlement)
		// 	(+2 resource per adjacent city)

		socket.to(gameId).emit('dicesTossed', { dices })
	}

	const proposeTrade = () => {
		return
	}

	const cancelTrade = () => {
		return
	}

	const acceptTrade = () => {return}

	const declineTrade = () => {return}

	const negotiateTrade = () => {return}

	const exchange = () => {return}

	const buildSettlement = () => {return}

	const buildCity = () => {return}

	const buildRoad = () => {return}

	const buyDevelopmentCard = () => {return}

	const useDevelopmentCard = () => {return}

	const moveThief = () => {return}

	const passTurn = () => {return}

	socket.on('match:ready', clientReady)
	socket.on('match:left', clientLeft)
	socket.on('match:tossDices', tossDices)
	socket.on('match:proposeTrade', proposeTrade)
	socket.on('match:cancelTrade', cancelTrade)
	socket.on('match:acceptTrade', acceptTrade)
	socket.on('match:declineTrade', declineTrade)
	socket.on('match:negotiateTrade', negotiateTrade)
	socket.on('match:exchange', exchange)
	socket.on('match:buildSettlement', buildSettlement)
	socket.on('match:buildCity', buildCity)
	socket.on('match:buildRoad', buildRoad)
	socket.on('match:buyDevelopmentCard', buyDevelopmentCard)
	socket.on('match:useDevelopmentCard', useDevelopmentCard)
	socket.on('match:moveThief', moveThief)
	socket.on('match:passTurn', passTurn)
}
