<template>
  <v-container>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4" class="text-center mt-10">
        <v-card title="LOGIN" class="mt-10">
          <v-container>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="onSubmit"
          >

            <v-text-field
                v-model="login.email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                label="Password"
                type="password"
                v-model="login.password"
                hint="Enter your password to access this website"
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

export default {
  name: "Login",
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
      await this.$store.dispatch("auth/login", this.login).then(
          (response) => {
            if (response.code === 200) {
              this.$router.push('/dashboard');
              setTimeout(function(){
                window.location.reload();
              }, 1000);
            } else {
              console.log(response)
            }
          },
          (error) => {
            console.log(error)
          }
      );
    },
  },
}
</script>

<style scoped>

</style>
