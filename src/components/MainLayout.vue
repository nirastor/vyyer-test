<template>
  <div class="main flex">
    <div class="sidebar"></div>
    <div class="app">
      <div class="app-menu"></div>
      <div class="app-content">
        <div class="card">
          <div class="search flex"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
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
  display: flex;
  justify-content: center;
}
.card {
  width: 1175px;
  height: 684px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 34px;
}
.flex {
  display: flex;
}
</style>
