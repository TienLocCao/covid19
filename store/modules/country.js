import { getListCountry } from '@/api/country'

const getDefaultState = () => {
  return {
    itemCountry: [],
    confirmed: [],
    recovered: [],
    deaths: []
  }
}

const state = getDefaultState()

const getters = {
    itemCountry: (state) => state.itemCountry,
    confirmed: (state) => state.confirmed,
    recovered: (state) => state.recovered,
    deaths: (state) => state.deaths,
}

const actions = {
  async fetchListCountry({ commit }, data) {
    await getListCountry(data)
      .then((response) => {
        commit('setListCountry', response.data)
      })
      .catch((error) => {
        if(error.response.status === 400) {
          const newLocal = "/"
          this.$store.dispatch("fetchListCountry", error.response.config.url.split(newLocal)[1])
        } 
        commit('fetDataFail', error.response.data)
      })
  },
  resetState({ commit }) {
    commit("resetState");
  },
}

const mutations = {
  setListCountry(state, data) {

    const handleData = [...new Set(data.map(o => JSON.stringify(o)))].map(s =>
      JSON.parse(s)
      );
    state.itemCountry = handleData;
  },
  fetDataFail(state, error) {
    // eslint-disable-next-line no-console
    console.error(error)
  },

  resetState(state) {
    Object.assign(state, getDefaultState());
  },

}

// function isShortDay(a, b) {
//     if (a.Date > b.Date) return -1;
//     if (a.Date < b.Date) return 1;
//     return 0;
//   }

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
