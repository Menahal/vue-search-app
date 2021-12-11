<template>
  <v-app>
    <Header/>
    <v-main>
      <HelloWorld/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';


export default {
  name: 'App',

  components: {
    Header,
    HelloWorld,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
