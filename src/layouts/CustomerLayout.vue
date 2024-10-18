<template>
    <div>
        <Sidebar :isDrawerOpen="isDrawerOpen" @update:isDrawerOpen="toggleDrawer" />
        <Header :isDrawerOpen="isDrawerOpen" @toggle-drawer="toggleDrawer" />
        <v-container>
            <router-view />
        </v-container>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isDrawerOpen = ref(false);

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
};
</script>
