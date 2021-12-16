import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    artistList:[],
    searchHistory:[]
  },
  actions:{
    fetchArtistList({ commit },payload) {
      axios.get(`https://rest.bandsintown.com/artists/${payload.artistname}`,{params:{
        app_id:"abc"
      }})
      .then(response => {
          commit('setArtistsList', response.data);
          commit('setSearchHistory',response.data);
      })
  }                
  },
  mutations:{
    setArtistsList(state, artistList) {
        // state.artistList = []
        state.artistList.push(artistList)
    },
    resetArtistsList(state){
      state.artistList = []
    },
    setSearchHistory(state, searchItem){
      state.searchHistory.push(searchItem)
    }
  },  
  getters: {
    getArtistList: (state) => state.artistList,
    getSearchHistory: (state) => state.searchHistory,
  }
})

export default store