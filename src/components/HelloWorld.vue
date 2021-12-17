<template>
  <div class="d-flex flex-column justify-start align-center mb-3 parent-div-height">
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
        @keydown="resetArtist()"
      ></v-text-field>
      <span v-if="artist && getArtist" 
        class="font-weight-bold text-capitalize subtitle-1"> 
        <span>{{getArtist.length > 1 ? "results" : "result"}}</span> for "{{artist}}"
      </span>
      <!-- <v-progress-linear indeterminate class="mt-n8" value="15"></v-progress-linear> -->
    </div>
    <!-- Search Results -->
    <div class="mt-8 d-flex" v-if="artist && getArtist">      
      <!-- If Artist Not Found -->
      <div v-if="!getArtist" > No artist found</div>
      <!-- Else -->
      <div>
        <v-card
          class="mx-2 pointer"
          max-width="300"
          min-width="300"
          outlined
          @click="viewArtist()"
        >
          <v-img
              height="150" width="100%"
              :src="getArtist.image_url ? getArtist.image_url : '@/assets/images/logos/logo.svg'"
            ></v-img>      
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{getArtist.name ? getArtist.name : "Anonymous"}}
              </v-list-item-title>
              <v-list-item-subtitle class="caption" :class="getArtist.facebook_page_url ? 'grey--text' :'text-capitalize'">
                {{getArtist.facebook_page_url ? getArtist.facebook_page_url : "No facebook URL"}}
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
    }),
    computed:{
    ...mapGetters([
      'getArtist'
    ]),      
    },
    methods:{
      /** 
       @description
       This methods is used to dispatch fetch request for searched artist 
       via store
       @param none
       @returns 
      */      
      search(){
        let payload = {
          app_id: "abcdef",
          artistname: this.artist
        }
        this.$store.dispatch("fetchArtistList",payload);
      },
      /** 
       @description
       This methods is used to generate a random string to be used as app_id 
       @param length
       @returns string
      */       
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
      /** 
       @description
       This methods is used to reset searched results when user edits the search 
       @param
       @returns 
      */      
      resetArtist(){
        this.$store.commit("resetArtist");
      },
      /** 
       @description
       This methods is used to redirect user to About page
       which contains selected artist's event details 
       @param
       @returns 
      */        
      viewArtist(){
        let payload = {
          artistname: this.artist
        }
        this.$store.dispatch('fetchArtistEvents',payload).then(()=>{
          this.$router.push('/About');
        });
      }
    },
    mounted(){
      this.resetArtist();
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