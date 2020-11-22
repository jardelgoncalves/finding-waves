<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  name: 'app-maps',
  data() {
    return {
      google: null,
      map: null
    }
  },
  props: {
    mapConfig: Object,
    apiKey: String,
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    })
    this.google = googleMapApi
    this.initializeMap()
  },

  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(
        mapContainer, this.mapConfig
      )
    }
  }
  
}
</script>

<template>
  <div class="maps">
    <div class="google-map" ref="googleMap"></div>
  </div>
</template>

<style lang="scss">
.maps {
  width: 100%;
  height: 400px;
}
</style>