<template>
  <v-container>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4" class="text-center mt-10">
        <v-card title="REGISTER" class="mt-10">
          <v-container>
            <v-form
                ref="form"
                @submit.prevent="onSubmit($event)"
            >
              <v-text-field
                  v-model="register.name"
                  :counter="10"
                  :rules="nameRules"
                  label="Name"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="register.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="register.password"
                  label="Password"
                  type="password"
                  hint="Enter your password to access this website"
              ></v-text-field>

              <v-btn
                  color="success"
                  class="mr-4"
                  @click.prevent="onSubmit"
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
import RequestRegister from "@/payload/request/RequestRegister";
import AuthService from "@/services/auth.service";

export default {
  name: "Register",
  data: () => ({
    register: new RequestRegister(),
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
  }),
  methods: {
    onSubmit(event) {
      event.preventDefault();
      AuthService.register(this.register).then((response) => {
        if (response.code === 200) {
          this.post = new RequestRegister();
          this.$router.push('/');
        } else {
          console.log(response)
        }
      });
    },
  },
}
</script>

<style scoped>

</style>
