<template>
  <div>
    <Sidebar :isDrawerOpen="isDrawerOpen" @update:isDrawerOpen="toggleDrawer" />
    <v-container>
      <router-view />
    </v-container>

   
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isDrawerOpen = ref(false);
const router = useRouter();

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const logout = () => {

  router.push('/auth/login');
};
</script>

<style scoped>

</style>
