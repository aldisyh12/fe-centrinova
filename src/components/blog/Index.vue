<template>
  <v-container>
    <h1 class="text-center">List Post</h1>
    <v-breadcrumbs :items="items" class="justify-center">
      <template v-slot:title="{ item }">
        {{ item.title.toUpperCase() }}
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6" class="text-center">
        <v-col cols="12" v-for="item in records" :key="item">
          <v-card
              class="mx-auto"
              max-width="600"
          >
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
                cover
            ></v-img>

            <v-card-title>
              {{ item.judul }}
            </v-card-title>

            <v-card-subtitle>
              {{ item.categories }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn
                  color="orange-lighten-2"
                  variant="text"
              >
                Read More
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                  :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  @click="show = !show"
              ></v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  {{ item.description }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>

import PostService from "@/services/post.service";

export default {
  name: "Index",
  components: {},
  data: () => ({
    show: false,
    records: [],
    items: [
      {
        title: 'Home',
        disabled: false,
        href: '/',
      },
      {
        title: 'Blog Post',
        disabled: true,
        href: 'blog',
      },
    ],
  }),
  mounted() {
    this.getRecordPost()
  },
  methods: {
    getRecordPost() {
      let payload = {
        limit: 10,
        searchBy: 'id',
        searchParam: '',
        page: 1
      }
      PostService.getPosts(payload)
          .then(response => {
            if (response.code === 200) {
              this.records = response.data.data;
            } else {
              console.log(response)
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    }
  },
}
</script>

<style scoped>

</style>
