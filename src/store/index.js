import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favorites: []
  },
  mutations: {
    setFavorites: (state, item) => {
      state.favorites.push(item);
    },
    removeFavorite: (state, id) =>{
      const index = state.favorites.findIndex(favorite => favorite.id === id);
      state.favorites.splice(index, 1);
    }
  },
  getters: {
    getFavorites: (state) => {
      return state.favorites;
    },
  },
  actions: {
    setFavorites({ commit }, payload){
      commit('setFavorites', payload);
    },
    removeFavorite({ commit }, payload){
      commit('removeFavorite', payload);
    }
  }, 
  plugins: [createPersistedState()]
});
