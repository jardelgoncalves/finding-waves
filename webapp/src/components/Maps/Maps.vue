<script>

export default {
  name: 'app-maps',
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: []
    }
  },
  props: {
    mapConfig: Object,
    apiKey: String,
  },
}
</script>

<template>
  <div class="maps">
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<style lang="scss">
.app-maps {
  width: 100%;
  height: 400px;
  background-color: red;
}
</style>