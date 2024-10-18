<template>
    <v-layout>
        <AdminSidebar />
        <v-main>
            <slot /> <!-- For child views like Dashboard, Orders -->
        </v-main>
    </v-layout>
</template>

<script setup>
// Any specific admin-related logic can go here
</script>
