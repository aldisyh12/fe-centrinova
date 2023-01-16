<template>
  <v-container class="fill-height d-flex align-center">
    <v-icon aria-hidden="false" size="28">
      mdi-home
    </v-icon>

    <v-btn
        variant="text"
        @click="onClickLanding"
    >
      Home
    </v-btn>

    <v-btn
        variant="text"
        @click="onCLickPost"
    >
      Post
    </v-btn>

    <v-spacer></v-spacer>

    <v-responsive max-width="260">
      <v-text-field
          density="compact"
          hide-details
          variant="solo"
      ></v-text-field>
    </v-responsive>

    <div v-if="!isLoggins">
      <v-btn
          variant="text"
          @click="onCLickRegister"
      >
        Register
      </v-btn>

      <v-btn
          variant="text"
          @click="onCLickLogin"
      >
        Login
      </v-btn>
    </div>

    <div v-if="isLoggins">
      <v-btn
          variant="text"
          @click.prevent="onClickDashboard"
      >
        Dashboard
      </v-btn>

      <v-btn
          variant="text"
          @click.prevent="onClickUpdatePassword"
      >
        Profile
      </v-btn>

      <v-btn
          variant="text"
          @click.prevent="handleLogout"
      >
        Logout
      </v-btn>
    </div>

  </v-container>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  name: "templateHeader",
  data: () => ({
    isLoggins: VueCookies.get("__MIH__BASE__SESSIONID__"),
  }),
  computed(){
    //
  },
  methods: {
    onClickLanding() {
      this.$router.push('/');
    },
    onCLickPost() {
      this.$router.push('/blog');
    },
    onCLickLogin() {
      this.$router.push('/login');
    },
    onClickDashboard() {
      this.$router.push('/dashboard');
    },
    onCLickRegister() {
      this.$router.push('/register');
    },
    onClickUpdatePassword() {
      this.$router.push('/update/password');
    },
    async handleLogout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
      setTimeout(function(){
        window.location.reload();
      }, 1000);
    },
  }
}
</script>

<style scoped>

</style>
