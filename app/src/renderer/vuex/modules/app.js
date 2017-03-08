import * as types from '../mutation-types'

const state = {
  loading: false
}

const mutations = {
  [types.CHANGE_LOADING] (state, { loading }) {
    state.loading = loading
  }
}

export default {
  state,
  mutations
}
