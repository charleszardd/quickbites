<template>
  <v-app>
    <v-main>
      <component :is="currentLayout">
        <router-view />
      </component>
    </v-main>
    <SnackbarMessage />

    <Receiver />
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import CustomerLayout from '@/layouts/CustomerLayout.vue';

const route = useRoute();

const currentLayout = computed(() => {
  return route.path.startsWith('/admincms') ? AdminLayout : CustomerLayout;
});
</script>
