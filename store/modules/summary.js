import { getAll } from '@/api/summary'

const getDefaultState = () => {
  return {
    items: [],
  }
}

const state = getDefaultState()

const getters = {
  items: (state) => state.items,
}

const actions = {
  async fetchSummary({ commit }, data) {
    await getAll(data)
      .then((response) => {
        commit('setListSummary', response.data)
      })
      .catch((error) => {
        commit('fetDataFail', error.response.data)
      })
  },
}

const mutations = {
  setListSummary(state, data) {
    state.items = sortSummary(data.Countries);
  },
  fetDataFail(state, error) {
    // eslint-disable-next-line no-console
    console.error(error)
  },
}

function sortSummary(arr) {
    let TotalConfirmedA, TotalConfirmedB, TotalDeathsA, TotalDeathsB, TotalRecoveredA, TotalRecoveredB;
    return arr.sort(function(a, b) {
        TotalConfirmedA = a.TotalConfirmed;
        TotalConfirmedB = b.TotalConfirmed;

        TotalDeathsA = a.TotalDeaths;
        TotalDeathsB = b.TotalDeaths;

        TotalRecoveredA = a.TotalRecovered;
        TotalRecoveredB = b.TotalRecovered;

        if (TotalDeathsA === TotalDeathsB && TotalConfirmedA === TotalConfirmedB) {
          if (TotalRecoveredA > TotalRecoveredB) {
            return -1;
          }
          if (TotalRecoveredA < TotalRecoveredB) {
            return 1;
          }
        } else if (TotalConfirmedA === TotalConfirmedB) {
          if (TotalDeathsA > TotalDeathsB) {
            return -1;
          }
          if (TotalDeathsA < TotalDeathsB) {
            return 1;
          }
        } else {
          if (TotalConfirmedA > TotalConfirmedB) {
            return -1;
          }
          if (TotalConfirmedA < TotalConfirmedB) {
            return 1;
          }
        }
        return 0;
      });
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
