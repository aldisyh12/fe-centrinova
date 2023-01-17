<template>
    <v-container>
      <v-row>
        <TemplateCarousel />
      </v-row>

      <v-row>
        <v-col cols="10">
          <v-sheet
              min-height="auto"
              rounded="lg"
          >
            <v-container>
              <v-row>
                <v-col
                    v-for="item in records"
                    :key="item"
                    cols="4"
                >
                  <v-card
                      :loading="loading"
                      class="mx-auto my-12"
                      max-width="374"
                  >
                    <template v-slot:loader="{ isActive }">
                      <v-progress-linear
                          :active="isActive"
                          color="deep-purple"
                          height="4"
                          indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-img
                        cover
                        height="250"
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    ></v-img>

                    <v-card-item>
                      <v-card-title><h2>{{ item.judul }}</h2></v-card-title>

                      <v-card-subtitle>
                        <span class="mr-1 mt-2">{{ item.categories }}</span>
                      </v-card-subtitle>
                    </v-card-item>

                    <v-divider class="mx-4 mb-1"></v-divider>

                    <v-card-title>{{  item.description }}</v-card-title>

                    <v-card-actions>
                      <v-btn
                          color="deep-purple-lighten-2"
                          variant="text"
                          @click="reserve(item.id)"
                      >
                        Read More
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>

        <v-col cols="2">
          <TemplateSidebar />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card style="background: #6a6ac5">
            <h1 style="color: #FFF" class="text-center mb-5 mt-5">Popular Post Section</h1>
            <v-row>
              <v-col cols="2"></v-col>
              <v-col cols="4" class="justify-center text-center">
                <v-card class="mb-5">
                  <v-img
                      cover
                      height="250"
                      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  ></v-img>
                </v-card>
              </v-col>
              <v-col cols="4" class="justify-center text-center">
                <v-card class="mb-5">
                  <v-img
                      cover
                      height="250"
                      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  ></v-img>
                </v-card>
              </v-col>
              <v-col cols="2"></v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import TemplateCarousel from "@/components/template/templateCarousel";
import TemplateSidebar from "@/components/template/templateSidebar";
import PostService from "@/services/post.service";

export default {
  name: "Index",
  components:{
    TemplateCarousel,
    TemplateSidebar
  },
  data: () => ({
    loading: false,
    selection: 1,
    records: [],
  }),
  mounted(){
    this.getRecordPost();
  },
  methods: {
    reserve (id) {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
      PostService.getPost(id)
          .then(response => {
            console.log(response);
            this.$router.push(`/post/${id}`);
          })
    },
    getRecordPost () {
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
