import * as types from '../mutation-types'

const state = {
  items: [],
  startAt: null,
  duration: 0,
  seekedTime: 0,
  currentTime: null,
  playing: false
}

const initialState = Object.assign({}, state)

const mutations = {
  [types.SET_CONTENT] (state, { content }) {
    if (state.items.length === 0) {
      state.startAt = content.video.metadata.date
      state.duration = content.video.metadata.duration
    }
    content.idx = state.items.length
    state.items.push(content)
  },
  [types.CLEAR_CONTENTS] (state) {
    state.items = []
    state.startAt = initialState.startAt
    state.duration = initialState.duration
    state.seekedTime = initialState.currentTime
    state.playing = initialState.playing
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
  },

  [types.CHANGE_STEP_SUSPEND] (state, { contentIdx, enable }) {
    state.items = state.items.map((item) => {
      if (item.idx === contentIdx) {
        item.stepSuspend = enable
      }
      return item
    })
  },

  [types.SET_OFFSET] (state, { contentIdx, offset }) {
    state.items = state.items.map((item) => {
      if (item.idx === contentIdx) {
        item.offset = offset
      }
      return item
    })
  }
}

export default {
  state,
  mutations
}
