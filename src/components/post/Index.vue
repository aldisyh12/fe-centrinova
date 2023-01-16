<template>
  <v-container
      class="fill-height"
      fluid
  >
    <h1 class="text-center">{{ records.judul }}</h1>
    <v-breadcrumbs :items="items" class="justify-center">
      <template v-slot:title="{ item }">
        {{ item.title.toUpperCase() }}
      </template>
    </v-breadcrumbs>
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-card>
              <v-img
                  class="align-end text-white"
                  height="500"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  cover
              >
                <v-card-title>{{ records.judul }}</v-card-title>
              </v-img>

              <v-row>
                <v-col cols="6">
                  <v-card-title class="text-center">
                    {{ records.categories }}
                  </v-card-title>
                </v-col>
                <v-col cols="6">
                  <v-card-title class="text-center">
                    {{ format_date(records.created_at) }}
                  </v-card-title>
                </v-col>
              </v-row>

              <v-spacer></v-spacer>

              <v-card-subtitle>
                {{ records.description }}
              </v-card-subtitle>
            </v-card>

            <br>

            <v-list lines="three">
              <v-list-item
                  v-for="item in comment"
                  :key="item.description"
                  title="Anonymous"
                  :subtitle="item.description"
                  prepend-avatar="https://picsum.photos/450/265?random"
              ></v-list-item>
            </v-list>

            <br>

            <v-container>
              <v-card class="text-center">
                <v-form
                    ref="form"
                    @submit.prevent="submitComment($event)"
                >

                  <v-text-field
                      label="Tulis Komen"
                      v-model="formComment.description"
                      required
                  ></v-text-field>

                  <v-btn
                      color="primary"
                      class="mb-2"
                      @click.prevent="submitComment"
                  >
                    Submit
                  </v-btn>
                </v-form>
              </v-card>
            </v-container>

          </v-col>
        <v-col cols="3">
          <v-card
              class="mx-auto"
              max-width="500"
          >
            <!-- <v-system-bar
              color="indigo darken-2"
              dark
            >
              <v-spacer></v-spacer>
              <v-icon icon="mdi-window-minimize"></v-icon>
              <v-icon icon="mdi-window-maximize"></v-icon>
              <v-icon icon="mdi-close"></v-icon>
            </v-system-bar>
            <v-toolbar
              color="indigo"
              dark
            >
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-toolbar-title>Discover</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon="mdi-magnify"></v-btn>
            </v-toolbar> -->

            <v-container fluid>
              <v-row dense>
                <v-col
                    v-for="card in cards"
                    :key="card.title"
                    :cols="card.flex"
                >
                  <v-card>
                    <v-img
                        :src="card.src"
                        class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                        cover
                    >
                      <v-card-title class="text-white" v-text="card.title"></v-card-title>
                    </v-img>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

                      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

                      <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>

<script>
import PostService from "@/services/post.service";
import moment from 'moment'
import CommentService from "@/services/comment.service";
import RequestComment from "@/payload/request/RequestComment";

export default {
  name: "Index",
  data: () => ({
    records: {},
    comment: [],
    formComment: {},
    cards: [
      { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
      { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
    ],
    items: [
      {
        title: 'Home',
        disabled: false,
        href: '/',
      },
      {
        title: 'Post',
        disabled: true,
        href: 'blog',
      },
    ],
    comments: [
      {
        title: 'Aldiansyah',
        subtitle: 'wah bagus banget',
        avatar: 'https://picsum.photos/450/265?random',
      },
      {
        title: 'Aldi',
        subtitle: 'iya bagus banget',
        avatar: 'https://picsum.photos/450/265?random',
      },
    ],
  }),
  mounted() {
    this.getRecordPost();
    this.getComment();
  },
  methods:{
    format_date(value){
      if (value) {
        return moment(String(value)).format('YYYY-MM-DD')
      }
    },
    getRecordPost () {
      PostService.getPost(this.$route.params.id)
          .then(response => {
            if (response.code === 200) {
              this.records = response.data;
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
    },
    getComment () {
      CommentService.getCommentByPostId(this.$route.params.id)
          .then(response => {
            if (response.code === 200) {
              this.comment = response.data;
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
    },
    submitComment (event) {
      event.preventDefault();
      let payload = {
        post_id: this.$route.params.id,
        description: this.formComment.description
      }
      CommentService.createCommentByPostId(payload).then(response => {
            if (response.code === 200) {
              console.log(response)
              this.formComment = new RequestComment();
              window.location.reload();
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
