<template>
    <div>
        <v-navigation-drawer location="left" permanent border="none">
            <template v-slot:prepend>
                <v-list-item
                    prepend-avatar="https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/455890382_3684470281792816_3298160045268708108_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEPkRFRcLqfkDdh49GxOYGGbcDYOgYU89RtwNg6BhTz1HI5_Vs_xF3iZpyrtHlYoxFl5CaBn9TvxgVsmw1SufCX&_nc_ohc=jIvz9--_nQIQ7kNvgEbXVUc&_nc_ht=scontent.fceb2-2.fna&_nc_gid=A-IKm-4hmPBEHaDm-QI9kOw&oh=00_AYC-jH1OI154fv9nFmprh0SF2A6m2aqoASc7On38x3kJGg&oe=67169BB0"
                    lines="three">
                    <v-list-item-title>Joshua Paulo</v-list-item-title>
                    <v-list-item-subtitle><small>joshuapauloynzon@gmail.com</small></v-list-item-subtitle>
                </v-list-item>
            </template>

            <v-list density="compact" nav>
                <v-list-item v-for="(item, index) in items" :key="index" :to="item.route" class="custom-radius"
                    color="primary" :prepend-icon="item.icon">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
    { title: 'Dashboard', route: '/admincms/dashboard', icon: 'mdi-view-dashboard-outline' },
    { title: 'Orders', route: '/admincms/orders', icon: 'mdi-package-variant-closed' },
    { title: 'Products', route: '/admincms/products', icon: 'mdi-food-outline' },
    { title: 'Customers', route: '/admincms/customers', icon: 'mdi-account-group-outline' },
    { title: 'Admins', route: '/admincms/admins', icon: 'mdi-shield-account-outline' },
]);
</script>

<style scoped></style>
