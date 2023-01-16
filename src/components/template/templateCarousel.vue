<template>
  <v-col cols="12">
    <v-carousel hide-delimiters show-arrows="hover">
      <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
      ></v-carousel-item>

      <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
      ></v-carousel-item>

      <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
      ></v-carousel-item>
    </v-carousel>
  </v-col>
</template>

<script>
export default {
  name: "templateCarousel"
}
</script>

<style scoped>

</style>
