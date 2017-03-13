export const contents = state => state.contents.items
export const startAt = state => state.contents.startAt
export const duration = state => state.contents.duration
export const currentTime = state => state.contents.currentTime
export const playing = state => state.contents.playing
export const noContents = state => state.contents.items.length === 0
