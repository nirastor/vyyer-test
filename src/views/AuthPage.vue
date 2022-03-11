<template>
  <div>
    <UserProfile />
    <!-- <div>
      <label for="login">Login</label>
      <input id="login" v-model="login" />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" v-model="password" />
    </div> -->
    <button @click="onLogin">Login</button>
    <button @click="onLogout">Logout</button>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile";

export default {
  // data() {
  //   return {
  //     login: null,
  //     password: null,
  //   };
  // },
  components: { UserProfile },
  methods: {
    onLogin() {
      let isAuth = this.$auth.user;
      console.log(isAuth);
      console.log(this.login, this.password);
      this.$auth.loginWithRedirect();
    },
    onLogout() {
      console.log("logout here");
      this.$auth.logout();
    },
  },
};
</script>
