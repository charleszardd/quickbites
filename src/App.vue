<template>
  <v-app>
    <v-main>
      <Sidebar :isDrawerOpen="isDrawerOpen" @update:isDrawerOpen="toggleDrawer" />
      <Header :isDrawerOpen="isDrawerOpen" @toggle-drawer="toggleDrawer" />
      
      <component :is="currentLayout">
        <router-view />
      </component>
    </v-main>
    <SnackbarMessage />
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import CustomerLayout from '@/layouts/CustomerLayout.vue';

const isDrawerOpen = ref(false);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const route = useRoute();

const currentLayout = computed(() => {
  return route.path.startsWith('/admincms') ? AdminLayout : CustomerLayout;
});
</script>
