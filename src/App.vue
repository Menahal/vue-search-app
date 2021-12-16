<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';


export default {
  name: 'App',

  components: {
    Header,
    Footer,
  },

  data: () => ({
    //
  }),
  mounted(){
    // this.$router.push('/');
  }
};
</script>
