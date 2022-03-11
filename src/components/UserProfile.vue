<template>
  <div>
    <div>isAuthenticated: {{ isAuth }}</div>
    <div v-if="isAuth">
      <div>Nickname: {{ user.nickname }}</div>
      <!-- <div>Token: {{ $store.state.token }}</div> -->
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
  async created() {
    // Костыль т.к. объект auth появляется не сразу и пока не разобрался можно ли его получить асинхронно
    await this.delay(2000);
    this.isAuth = this.$auth.isAuthenticated;
    this.user = this.$auth.user;
    const token = await this.$auth.getTokenSilently();
    this.$store.commit("setToken", token);
  },
  methods: {
    delay(delay) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, delay);
      });
    },
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
