export interface ServerEvents {
  'match:start': () => void
	'match:tossDices': () => void
  'match:end': () => void
}
