<template>
  <div id="app">
    

    <div v-if="networkConnection == 'offline'" style="position: fixed; z-index: 10000; background-color: white; width: 100%; height: 100vh; background-image: url('images/nointernet.png'); background-size: inherit; background-position: center; background-position-x: -2px;">

    <div style="display: flex; justify-content: center;">
        <div style="color: rgb(0, 140, 154); font-weight: 200; font-size: 45px; margin-top: 20%;">
          Whoops!
        </div>
    </div>
    

      <div style="display: flex; justify-content: center;">
        <div style="color: #212121; font-weight: 300; font-size: 18px; margin-top: 20px; text-align: center; padding: 0 45px;">
          No internet connection found.<br>Please check your connection.
        </div>
      </div>

    </div>


    <Loader v-if="loader" :main="false" :spinner="true"></Loader>
    <router-view></router-view>



    <!-- SVGIcon Source Component -->

  </div>
</template>

<style src="../assets/scss/style.scss" lang="scss"></style>

<script>
//require('./../assets/css/animate');
//require('./../assets/css/vue2-autocomplete.css');
//require('./../assets/js/multiRange');
//import Network from './../assets/js/network'


import Loader from './Components/Loader'
import moment from 'moment';


// import Network from './../assets/js/network'
// import Vue from 'vue'

export default {
  name: 'ExitApp',
  components: {
    Loader
  },
  data() {
    return {
      loader: false,
      network: 'online',
    }
  },
  computed: {
    networkConnection () {
			return this.$store.state.network;
    }
  },
  watch: {
    '$store.state.lastNotification': function (payload) {
      if(payload && payload.notification && payload.notification.onStart)
      {
        this.$router.push({name: 'AllExit'});
      }
    }
  },
  methods: {
    stopLoader () {
      this.loader = false;
    },
    startLoader () {
      this.loader = true;
    },
    go_back: function(){
      this.$router.go(-1);
    },
  },
  mounted () {

    


    var scope = this; 
    setTimeout(function () { //omg Patrick... 
      setInterval(function () {
        var connectionStatus = navigator.onLine ? 'online' : 'offline';
        //console.log(connectionStatus, 'connection');
          
        scope.$store.commit('updateNetwork', {
          network: connectionStatus
        })
      
      }, 1000);
    }, 3000); //we need to go deeper -> more timeouts here please!
  }
}
</script>
