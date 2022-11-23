import express from 'express'
import { createServer, Server as HttpServer } from 'http'
import { Server as IOServer, Socket as ServerSocket } from 'socket.io'
import { io, Socket as ClientSocket } from 'socket.io-client'

describe('game handler', () => {
  let ioServer: IOServer 
	let httpServer: HttpServer 
	let serverSocket: ServerSocket 
	let clientSocket: ClientSocket 

  beforeAll((done) => {
    httpServer = createServer(express())
		ioServer = new IOServer(httpServer)
		const port = 2000

    httpServer.listen(port, () => {
      clientSocket = io(`http://localhost:${port}`)
      ioServer.on('connection', (socket) => {
        serverSocket = socket
      })
      clientSocket.on('connect', done)
    })
  })

  afterAll(() => {
		httpServer.close()
    ioServer.close()
    clientSocket.close()
  })

  test('should work', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world')
      done()
    })
    serverSocket.emit('hello', 'world')
  })
})
