export const generateId = (prefix = '') => {
	return prefix ? `${prefix}-${Math.random()}` : `${Math.random()}`
}

export const randomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) - min)
}

export const tossDice = () => {
	return randomInt(1, 6)
}

export const assignColor = (index: number) => {
	return ['red', 'blue', 'green'][index]
}
