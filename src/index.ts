import express  from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { registerMatchHandler, registerLobbyHandler } from './handlers'
import { ClientEvents, InterServerEvents, ServerEvents, SocketData } from './types/socket'

const app = express()
const port = process.env.PORT || 3000
const httpServer = createServer(app)
const io = new Server<ClientEvents, ServerEvents, InterServerEvents, SocketData>(httpServer, {
	cors: {
    origin: 'http://localhost:5173'
  }
})

const onConnection = (socket: Socket) => {
	console.log(`A new user connected. socket_id:${socket.id}`)

	registerMatchHandler(io, socket)
	registerLobbyHandler(io, socket)

	socket.send('Connection to socket stablished')
	socket.rooms.forEach((room) => {
		console.log(`User room: ${room}`)
	})

	socket.on('disconnecting', () => {
		socket.rooms.forEach((room) => {
			console.log(`Disconnecting user ${socket.id} from room ${room}`)
			socket.leave(room)
		})
	})

	socket.on('disconnect', (reason: string) => {
		console.log(`User ${socket.id} has disconnected. Reason: ${reason}`)
	})
}

io.on('connection', onConnection)

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
