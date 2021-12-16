<template>
  <div class="d-flex flex-column justify-start align-center mb-3 parent-div-height">
    <!-- {{getArtistList}} -->
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
        @keydown="resetArtistList()"
      ></v-text-field>
      <span v-if="artist && getArtistList.length" 
        class="font-weight-bold subtitle-1"> 
        {{getArtistList.length}} <span>{{getArtistList.length > 1 ? "results" : "result"}}</span> found for "{{artist}}"
      </span>
      <!-- <v-progress-linear indeterminate class="mt-n8" value="15"></v-progress-linear> -->
    </div>
    <!-- Search Results -->
    <div class="mt-8 d-flex" v-if="artist && getArtistList.length">      
      <!-- If Artist Not Found -->
      <!-- <div v-if="!getArtistList.length" > No artist found</div> -->
      <!-- Else -->
      <div>
        <v-card
          class="mx-2 pointer"
          max-width="300"
          min-width="300"
          outlined
          v-for="(artist,index) in getArtistList"
          :key="index"
          @click="viewArtist()"
        >
          <v-img
              height="150" width="100%"
              :src="artist.image_url ? artist.image_url : sample_image"
            ></v-img>      
          <v-list-item three-line>
            <v-list-item-content>
              <!-- <div class="text-overline mb-4">
                OVERLINE
              </div> -->
              <v-list-item-title class="text-h5 mb-1">
                {{artist.name ? artist.name : "Anonymous"}}
              </v-list-item-title>
              <v-list-item-subtitle class="caption" :class="artist.facebook_page_url ? 'grey--text' :'text-capitalize'">
                {{artist.facebook_page_url ? artist.facebook_page_url : "No facebook URL"}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="pb-3">
            <v-btn
              outlined
              rounded
              text
              class="text-capitalize"
              @click="viewArtist()"
            >
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
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
      sample_image:""
    }),
    computed:{
    ...mapGetters([
      'getArtistList'
    ]),      
    },
    watch:{
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
      },
      resetArtistList(){
        this.$store.commit("resetArtistsList");
      },
      viewArtist(){
        this.$router.push('About')
      }
    },
    mounted(){
      this.resetArtistList();
    }
  }
</script>

<style scoped>
  .search-width{
    width: 70vw;
  }
  .parent-div-height{
    min-height: 80vh;
  }
  @media screen and (max-width: 576px) {
   .search-width{
     width:90vw
   } 
  }
</style>