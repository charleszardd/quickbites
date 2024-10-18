<template>
    <v-app>
        <v-main>
            <Sidebar :isDrawerOpen="isDrawerOpen" @update:isDrawerOpen="toggleDrawer" />
            <v-main>
                <Header :isDrawerOpen="isDrawerOpen" @toggle-drawer="toggleDrawer" />
            </v-main>
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