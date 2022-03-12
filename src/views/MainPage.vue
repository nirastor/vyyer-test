<template>
  <div class="main d-flex">
    <div class="sidebar"></div>
    <div class="app">
      <div class="app-menu d-flex">
        <UserProfile />
      </div>
      <div class="app-content d-flex justify-center">
        <div class="card">
          <CustomersTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile";
import CustomersTable from "@/components/CustomersTable";

export default {
  components: { UserProfile, CustomersTable },
};
</script>

<style scoped>
.main {
  width: 1480px;
  height: 837px;
  margin: 0 auto;
  background-color: #f3f6f9;
}
.sidebar {
  width: 100px;
  background-color: #7242e6;
}
.app-menu {
  width: 1380px;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.02);
}
.app-content {
  width: 1380px;
  padding-top: 30px;
}
.card {
  width: 1175px;
  height: 684px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 34px;
}
</style>
