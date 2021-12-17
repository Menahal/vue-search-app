import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import persistState from "vuex-persist";
Vue.use(Vuex)
const BASE_URL = 'https://rest.bandsintown.com/artists/';
const store = new Vuex.Store({
  state: {
    artist: '',
    artistEvents: [],
    searchHistory: [],
  },
  actions:{
    /**
     * @description
     * This method is used to fetch searched artist results
     * @param {commit} 
     * @param payload
     */
    fetchArtistList({ commit },payload) {
      axios.get(`${BASE_URL}${payload.artistname}`,{params:{
        app_id:"abc"
      }})
      .then(response => {
          commit('setArtist', response.data);
          commit('setSearchHistory',response.data);
      })
  },
      /**
     * @description
     * This method is used to fetch event details of selected artist
     * @param {commit} 
     * @param payload
     */
       fetchArtistEvents({ commit },payload) {
        axios.get(`${BASE_URL}${payload.artistname}/events`,{params:{
          app_id:"abc",
          date:"all"
        }})
        .then(response => {
            console.log('response:::::',response.data);            
            commit('setArtistEvents', response.data);
        })
    },                    
  },
  mutations:{
    setArtist(state, artist) {
        state.artist = artist;
    },
    resetArtist(state){
      state.artist = ''
    },
    setSearchHistory(state, searchItem){
      state.searchHistory.push(searchItem)
    },
    setArtistEvents(state, events){
      state.artistEvents = events
    }
  },  
  getters: {
    getArtist: (state) => state.artist,
    getArtistEvents: (state) => state.artistEvents,
    getSearchHistory: (state) => state.searchHistory,
  },
  // plugins: [persistState()]
})

export default store