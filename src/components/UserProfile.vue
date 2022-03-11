<template>
  <div>
    <div>isAuthenticated: {{ isAuth }}</div>
    <div v-if="isAuth">
      <div>Nickname: {{ user.nickname }}</div>
      <button @click="logout">Log Out</button>
    </div>
    <div v-else>
      <div>Authorization required</div>
      <button @click="login">Log In</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      isAuth: this.$auth.isAuthenticated,
    };
  },
  created() {
    setInterval(() => {
      this.isAuth = this.$auth.isAuthenticated;
      this.user = this.$auth.user;
    }, 1000);
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
