<template>
  <div class="app-container app-container-front">

    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'LayoutFront',
  components: {
  },
  computed: {},
  data () {
    return {
      loader: true,
    }
  },
  destroyed(){

  },
  mounted () {

  },
  watch: {

  },
  methods: {

  }
}

</script>
