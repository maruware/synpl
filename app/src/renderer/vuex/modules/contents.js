import * as types from '../mutation-types'

const state = {
  items: []
}

const mutations = {
  [types.SET_CONTENT] (state, { content }) {
    state.items.push(content)
  },
  [types.REMOVE_CONTENT] (state, { idx }) {
    state.items[idx] = null
  }
}

export default {
  state,
  mutations
}
