<template>
  <div class="home-page">
    <div class="title">Vite-Electron-Vue3-TS-Template</div>
    <img src="@/assets/images/logo.png" width="60" />
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > img {
    margin: 20px 0
  }
}
</style>
