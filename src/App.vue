<template>
  <v-app>
    <v-main>
      <Sidebar :isDrawerOpen="isDrawerOpen" @update:isDrawerOpen="toggleDrawer" />
        <SnackbarMessage />
        <Header :isDrawerOpen="isDrawerOpen" @toggle-drawer="toggleDrawer" />
      
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const isDrawerOpen = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>
