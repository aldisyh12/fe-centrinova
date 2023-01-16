<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <TemplateHeader />
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <router-view></router-view>
    </v-main>

  </v-app>
  <TemplateFooter />
</template>

<script>
import TemplateFooter from "@/components/template/templateFooter";
import TemplateHeader from "@/components/template/templateHeader";

export default {
  name: "Home",
  components: {
    TemplateFooter,
    TemplateHeader,
  },
}
</script>

<style scoped>

</style>
