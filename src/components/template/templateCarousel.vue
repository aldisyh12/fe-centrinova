<template>
  <v-col cols="8">
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
  <v-col cols="4">
    <v-img
        cover
        height="240"
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
    ></v-img>
    &nbsp;
    <v-img
        cover
        height="240"
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    ></v-img>
  </v-col>
</template>

<script>
export default {
  name: "templateCarousel"
}
</script>

<style scoped>

</style>
