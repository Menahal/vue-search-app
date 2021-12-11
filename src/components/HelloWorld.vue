<template>
  <div style="height:80vh" class="d-flex flex-column justify-start align-center">
       <!-- getArtistList: {{getArtistList}} -->
    <!-- Search Field -->
    <div id="search" class="mt-15 search-width" >
      <v-text-field
        label="Search artist"
        placeholder="Search artist"
        v-model="artist"
        solo
        append-icon="mdi-magnify"
        color="grey"
        autofocus
        @keydown.enter="search()"
      ></v-text-field>
      <span v-if="getArtistList.length" 
        class="font-weight-bold"> 
        {{getArtistList.length}} results found for "{{artist}}"
      </span>
      <!-- <v-progress-linear indeterminate class="mt-n8" value="15"></v-progress-linear> -->
    </div>
    <!-- Search Results -->
    <div class="mt-8" v-if="getArtistList.length">      
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
        v-for="(artist,index) in getArtistList"
        :key="index"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">
              OVERLINE
            </div>
            <v-list-item-title class="text-h5 mb-1">
              {{artist.name}}
            </v-list-item-title>
            <v-list-item-subtitle>{{artist.facebook_page_url}}</v-list-item-subtitle>
          </v-list-item-content>

    <v-img
      height="50" width="50"
      :src="artist.image_url"
    ></v-img>
        </v-list-item>

        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
          >
            View
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
  
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'HelloWorld',

    data: () => ({
      artist:"",
      artists:[],
    }),
    computed:{
    ...mapGetters([
      'getArtistList'
    ]),      
    },
    methods:{
      search(){
        let payload = {
          app_id: "abcdef",
          artistname: this.artist
        }
        this.$store.dispatch("fetchArtistList",payload);
      },
      generateString(length) {
          // declare all characters
          const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let result = ' ';
          const charactersLength = characters.length;
          for ( let i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
      }
    },
    mounted(){
      // this.$store.dispatch("fetchAllArtists")
    }
  }
</script>

<style scoped>
  .search-width{
    width: 70vw;
  }
  @media screen and (max-width: 576px) {
   .search-width{
     width:90vw
   } 
  }
</style>