<template>
  <v-container>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4" class="text-center mt-10">
        <v-card title="PROFILE" class="mt-10">
          <v-container>
            <v-text-field
                label="Name"
                v-model="detailUser.name"
                disabled
            ></v-text-field>

            <v-text-field
                label="Email"
                v-model="detailUser.email"
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
import AuthService from "@/services/auth.service";
import VueCookies from "vue-cookies";
import Utils from "@/helpers/Utils";

export default {
  name: "UpdatePassword",
  data: () => ({
    login: new RequestLogin(),
    detailUser: {},
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    user: {},
  }),
  created() {
    this.user = Utils.jwtDecode(
        JSON.parse(JSON.stringify(VueCookies.get("__MIH__BASE__SESSIONID__"))).access_token
    );
    this.getProfile();
  },
  methods: {
    getProfile() {
      AuthService.profile(this.user.id).then((response) => {
        if (response.code === 200) {
          this.detailUser = response.data;
        } else {
          console.log(response)
        }
      })
    },
    async onSubmit() {
      await AuthService.changePassword(this.detailUser.id, this.login).then((response) => {
        if (response.code === 200) {
          this.login = new RequestLogin();
          this.$router.push('/dashboard');
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
