import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    misPokemones: [],

  },
  getters:{
    getPokemones: state => {
      return state.misPokemones;
    },
  },
  mutations: {
    add_state_mis_pokemones(state, _pokemon) {
      state.misPokemones.push(_pokemon);
    },
    eliminar_state_mis_pokemones(state, _pokemon){
      let arrayPok = state.misPokemones;
      const index2 = arrayPok.indexOf(_pokemon);
      state.misPokemones.splice(index2, 1);
    }
  },
  actions: {
    Add_pokemon: async function (_, _pokemon) {
      this.commit('add_state_mis_pokemones', _pokemon);
    },
    eliminar_pokemon: async function (_, _pokemon) {
      this.commit('eliminar_state_mis_pokemones', _pokemon);
    },
  }
})
