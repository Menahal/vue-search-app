import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    artistList:[]
  },
  actions:{
    fetchArtistList({ commit },payload) {
        console.log("payload",payload);
        axios.get(`https://rest.bandsintown.com/artists/`,{params:payload})
            .then(response => {
                commit('setArtistsList', response.data)
            })
    }        
  },
  mutations:{
    setArtistsList(state, artistList) {
        state.artistList = []
        state.artistList.push(artistList)
    }
  },  
  getters: {
    getArtistList: (state) => state.artistList,
  }
})

export default store