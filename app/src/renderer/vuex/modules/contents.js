import * as types from '../mutation-types'

const state = {
  items: [],
  startAt: null,
  duration: 0,
  seekedTime: 0,
  currentTime: null,
  playing: false
}

const mutations = {
  [types.SET_CONTENT] (state, { content }) {
    if (state.items.length === 0) {
      state.startAt = content.video.metadata.date
      state.duration = content.video.metadata.duration
    }
    content.idx = state.items.length
    state.items.push(content)
  },
  [types.REMOVE_CONTENT] (state, { idx }) {
    state.items[idx] = null
  },

  [types.SEEK] (state, { time }) {
    state.seekedTime = time
    state.currentTime = time
  },

  [types.VIDEO_ADVANCED] (state, { time }) {
    state.currentTime = time
  },

  [types.CHANGE_PLAYING] (state, { playing }) {
    state.playing = playing
  }
}

export default {
  state,
  mutations
}
