import moment from 'moment'
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
    // eslint-disable-next-line no-return-assign
    this.handleData.forEach((item) => {

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this[Date] = convertTZ(item.Date, timezone);
    });
    
    // eslint-disable-next-line no-console
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
function convertTZ(date, tzString) {
  return moment(new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}))).format('YYYY-MM-DD HH:MM:SS');   
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
