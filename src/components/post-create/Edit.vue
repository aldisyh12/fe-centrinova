<template>
  <v-container>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4" class="text-center mt-10">
        <v-card title="Edit Post" class="mt-10">
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
  name: "Edit",
  data: () => ({
    postUser: new RequestPostUser(),
  }),
  mounted() {
    this.getDetailPost();
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      PostUserService.updatePost(this.postUser.id, this.postUser).then((response) => {
        if (response.code === 200) {
          this.getDetailPost();
          this.postUser = new RequestPostUser();
          this.$router.push('/dashboard');
        } else {
          console.log(response)
        }
      });
    },
    getDetailPost(){
      PostUserService.getPost(this.$route.params.id).then((response) => {
        if(response.code === 200){
          this.postUser = response.data;
        }else{
          console.log(response)
        }
      });
    },
    /**
     * Image Change
     * @param e
     */
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    /**
     * Convert image to bas64
     * @param file
     */
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.postUser.images = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
}
</script>

<style scoped>

</style>
