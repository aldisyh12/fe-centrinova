<template>
  <v-sheet rounded="lg">
    <v-list rounded="lg">
      <v-list density="compact">
        <v-list-subheader>Panel</v-list-subheader>

        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            active-color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  name: "templateSidebar",
  data() {
    return {
      items: [
        { text: 'Post', icon: 'mdi-clock' },
        { text: 'About', icon: 'mdi-account' },
      ],
    }
  }
}
</script>

<style scoped>

</style>
