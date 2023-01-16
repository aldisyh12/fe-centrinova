<template>
  <v-container>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4" class="text-center mt-10">
        <v-card title="Create Post" class="mt-10">
          <v-container>
            <v-form
                ref="form"
                lazy-validation
                @submit.prevent="onSubmit($event)"
            >
              <v-text-field
                  v-model="postUser.judul"
                  type="text"
                  label="judul"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="postUser.categories"
                  type="text"
                  label="category"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="postUser.description"
                  type="text"
                  label="deskripsi"
                  required
              ></v-text-field>

              <v-file-input
                  label="Upload Gambar"
                  prepend-icon="mdi-camera"
                  accept="image/*"
                  @change="onFileChange"
              ></v-file-input>

              <v-btn
                  color="success"
                  class="mr-4"
                  @click="onSubmit"
              >
                Submit
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostUserService from "@/services/postUser.service";
import RequestPostUser from "@/payload/request/RequestPostUser";

export default {
  name: "Index",
  data: () => ({
    postUser: new RequestPostUser(),
  }),
  methods: {
    onSubmit(event) {
      event.preventDefault();
      PostUserService.createPost(this.postUser).then((response) => {
        if (response.code === 200) {
          this.postUser = new RequestPostUser();
          this.$router.push('/dashboard');
        } else {
          console.log(response)
        }
      });
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FormData();
      reader.append('images', this.post.thumbnail);
      reader.readAsDataURL(file);
    },
  },
}
</script>

<style scoped>

</style>
