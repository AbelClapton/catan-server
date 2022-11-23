import { Pieces, Resources } from '../../types/game'
import { Card } from './Card'

export class Player {
	id: string
	username: string
	color: string
	score: number
	knightsUsed: number
	longestPath: number
	resources: Resources 
	cards: Card[] 
	pieces: Pieces

	constructor(id: string, username: string, color: string) {
		this.id = id
		this.username = username
		this.color = color
		this.score = 0
		this.knightsUsed = 0
		this.longestPath = 0
		this.resources = {
			wood: 0,
			clay: 0,
			sheep: 0,
			wheat: 0,
			stone: 0
		}
		this.cards = []
		this.pieces = {
			settlements: 5,
			cities: 4,
			roads: 15,
		}
	}
}
