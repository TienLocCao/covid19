// import Vue from "vue";
import Vuex from 'vuex'

import summary from './modules/summary'
import country from './modules/country'

// export const bus = new Vue();
// Vue.use(Vuex);
const createStore = () => {
  return new Vuex.Store({
    modules: {
      summary,
      country
    },
  })
}
export const strict = false
export default createStore
