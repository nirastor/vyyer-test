<template>
  <div class="d-flex pa-4">
    <div v-if="$auth.loading" class="d-flex">
      <div>Проверяем авторизацию</div>
      <v-progress-circular></v-progress-circular>
    </div>

    <div v-else>
      <div v-if="$auth.isAuthenticated" class="d-flex">
        <div class="mr-4">Авторизован!</div>
        <div class="mr-4">Nickname: {{ $auth.user.nickname }}</div>
        <v-btn small text plain @click="logout">Log Out</v-btn>
      </div>

      <div v-else class="d-flex">
        <div class="mr-4">Надо авторизоваться!</div>
        <v-btn small text @click="login">Log In</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
