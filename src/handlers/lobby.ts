import { Server, Socket } from 'socket.io'
import { generateId } from '../helpers'

export const registerLobbyHandler = (io: Server, socket: Socket) => {

	const createMatch = async () => {
		const matchId = generateId('match')

		io.in('lobby').socketsJoin(matchId)
		io.socketsLeave('lobby')
		io.in(matchId).emit('match:ready', matchId)

		console.log(`Match room created with ID: ${matchId}`)
		console.log(`Users in room: ${(await io.in(matchId).fetchSockets()).map(el => el.id)}`)
	}

	const getAmountOfUsersInLobby = async () => {
		return (await io.in('lobby').fetchSockets()).length
	}

	const join = async (username: string, ack: (response: string) => void) => {
		console.log(`recieved request from ${username} to join the lobby`)
		socket.data.username = username
		socket.join('lobby')
		socket.broadcast.to('lobby').emit('lobby:user-joined', username)
		console.log(`User '${username}' with ID ${socket.id} joined the lobby. Users in lobby: ${await getAmountOfUsersInLobby()}`)

		if (await getAmountOfUsersInLobby() >= 3)
			createMatch()
		ack('joined to lobby')
	}

	const leave = async () => {
		socket.leave('lobby')
		socket.broadcast.to('lobby').emit('lobby:user-leaved', socket.data.user.name)
		console.log(`User ${socket.id} left the lobby. Users in lobby: ${await getAmountOfUsersInLobby()}`)
	}

	socket.on('lobby:join', join)
	socket.on('lobby:leave', leave)

}
