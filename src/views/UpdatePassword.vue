<template>
  <v-container>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4" class="text-center mt-10">
        <v-card title="PROFILE" class="mt-10">
          <v-container>
            <v-text-field
                label="Name"
                v-model="login.password"
                disabled
            ></v-text-field>

            <v-text-field
                label="Email"
                v-model="login.password"
                disabled
            ></v-text-field>

            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="onSubmit"
            >

              <v-text-field
                  label="Password"
                  type="password"
                  v-model="login.password"
                  hint="Change Password"
              ></v-text-field>

              <v-btn
                  color="success"
                  class="mr-4"
                  type="submit"
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
import RequestLogin from "@/payload/request/RequestLogin";
import PostUserService from "@/services/postUser.service";
import RequestPostUser from "@/payload/request/RequestPostUser";
import AuthService from "@/services/auth.service";

export default {
  name: "UpdatePassword",
  data: () => ({
    login: new RequestLogin(),
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
  }),
  methods: {
    async onSubmit() {
      await AuthService.profile(this.postUser).then((response) => {
        if (response.code === 200) {
          this.postUser = new RequestPostUser();
          this.$router.push('/dashboard');
        } else {
          console.log(response)
        }
      });
    },
    getProfile(){}
  },
}
</script>

<style scoped>

</style>
