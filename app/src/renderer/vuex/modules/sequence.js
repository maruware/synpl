import * as types from '../mutation-types'

const state = {
  at: 0
}

const mutations = {
  [types.SEEK] (state, { at }) {
    state.at = at
  }
}

export default {
  state,
  mutations
}
