<template>
  <div class="pa-6">
    <!-- Back Button -->
    <v-btn @click="back()" depressed class="d-flex align-center pointer text-capitalize transparent">
      <v-icon color="dark">mdi-chevron-left</v-icon>
      <span class="font-weight-bold">Back to results</span>
    </v-btn>
    <!-- Profile Section -->
    <div class="d-flex align-center justify-start pa-3 mt-4">
      <div style="height:150px;width:150px" class="elevation-2 white pa-1 d-flex align-center justify-center">
        <img
          style="height:140px;width:140px"
          :src="getArtist.image_url ? getArtist.image_url : '@/assets/images/logos/logo.svg'"
          alt="artist_profile"
        >
      </div>      
      <div class="display-1 ml-5">
        <p>{{getArtist.name ? getArtist.name : 'Anonymous'}}</p>
        <p class="subtitle-2 mt-0">
          <a target="" class="link grey--text" 
          :href="getArtist.facebook_page_url ? getArtist.facebook_page_url : '#'">
          {{getArtist.facebook_page_url ? getArtist.facebook_page_url : 'No facebook URL'}}
          </a>
        </p>
      </div>
      <!-- <v-divider vertical class="my-3 mx-1"></v-divider> -->
    </div>
    <v-divider style="width:100vw" class="my-6"></v-divider>
    <!-- Event Section -->
    <div>
      <p class="subtitle-1">{{getArtist.upcoming_event_count ? getArtist.upcoming_event_count : '0'}} upcoming events</p>
    </div>
    <div>
      <v-card elevation="2" 
        v-for="(event,i) in getArtistEvents" 
        :key="i" 
        max-height="230px" min-height="230px"
        class="mr-4 mb-4 d-inline-block event-card-dimensions" 
      >
        <v-card-title class="text-uppercase py-3 dark--text subtitle-1 rounded-0">
          event details
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <v-row no-gutters>
            <v-col>
              <div class="font-weight-bold body">Country</div>
              <div>{{event.venue && event.venue.country ? event.venue.country : 'Unknown'}}</div>
            </v-col>
            <v-col>
              <div class="font-weight-bold body">Venue</div>
              <div>Arizona</div>              
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="font-weight-bold body">City</div>
              <div>{{event.venue && event.venue.city ? event.venue.city : 'Unknown'}}</div>              
            </v-col>
            <v-col>
              <div class="font-weight-bold body">Date</div>
              <div>{{event.datetime ? event.datetime.slice(0,10) : 'Unknown'}}</div>              
            </v-col>
          </v-row>          
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
    ...mapGetters([
      'getArtist',
      'getArtistEvents',
    ]),      
    },
    methods:{
      back(){
        this.$router.push('/')
      }
    }
}
</script>

<style scoped>
  @media (max-width: 540px) {
    .event-card-dimensions{
      min-width: 90vw !important;
    }
  }
  @media (min-width: 768px) {
    .event-card-dimensions{
    width:30%; 
    min-width:200px;
  }
}


</style>
