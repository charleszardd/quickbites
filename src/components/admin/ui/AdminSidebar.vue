<template>
    <div>
        <!-- Navigation Drawer for Admin Sidebar -->
        <v-navigation-drawer v-if="isUserAuthenticated" location="left" permanent border="none">
            <!-- Admin Info -->
            <template v-slot:prepend>
                <v-list-item
                    prepend-avatar="https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/455890382_3684470281792816_3298160045268708108_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEPkRFRcLqfkDdh49GxOYGGbcDYOgYU89RtwNg6BhTz1HI5_Vs_xF3iZpyrtHlYoxFl5CaBn9TvxgVsmw1SufCX&_nc_ohc=jIvz9--_nQIQ7kNvgEbXVUc&_nc_ht=scontent.fceb2-2.fna&_nc_gid=A-IKm-4hmPBEHaDm-QI9kOw&oh=00_AYC-jH1OI154fv9nFmprh0SF2A6m2aqoASc7On38x3kJGg&oe=67169BB0"
                    lines="three">
                    <v-list-item-title>{{ adminName || 'P Diddy' }}</v-list-item-title>
                    <v-list-item-subtitle><small>{{ adminEmail || 'pee@diddy.com' }}</small></v-list-item-subtitle>
                </v-list-item>
            </template>

            <!-- Sidebar Menu Items -->
            <v-list density="compact" nav>
                <v-list-item v-for="(item, index) in items" :key="index" :to="item.route" class="custom-radius"
                    color="primary" :prepend-icon="item.icon">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>

                <!-- Divider and Logout Button -->
                <v-divider class="my-10"></v-divider>

                <v-btn @click="handleLogout" class="w-100 justify-start custom-radius" to="/admincms" flat
                    prepend-icon="mdi-logout">
                    Logout
                </v-btn>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { logout, getAuth } from "@/pages/AdminCMS/adminAuthServiceProvider/adminAuthService";

const items = ref([
    { title: 'Dashboard', route: '/admincms/dashboard', icon: 'mdi-view-dashboard-outline' },
    { title: 'Orders', route: '/admincms/orders', icon: 'mdi-package-variant-closed' },
    { title: 'Products', route: '/admincms/products', icon: 'mdi-food-outline' },
    { title: 'Customers', route: '/admincms/customers', icon: 'mdi-account-group-outline' },
    { title: 'Admins', route: '/admincms/admins', icon: 'mdi-shield-account-outline' },
]);

// Admin name and email
const adminName = ref('');
const adminEmail = ref('');

// Check authentication status
const isUserAuthenticated = ref(!!localStorage.getItem("admin-auth-token"));

// Logout function
const handleLogout = async () => {
    logout();
    localStorage.removeItem("token");
    isUserAuthenticated.value = false;
};

// Fetch admin name and email from the backend
onMounted(async () => {
    const { token } = getAuth(); // Get token from auth service
    if (token) {
        try {
            const response = await axios.get('/api/get-admin-name', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            adminName.value = `${response.data.first_name} ${response.data.last_name}`;
            adminEmail.value = response.data.email; // Assuming email is also provided
        } catch (error) {
            console.error('Error fetching admin data:', error.response ? error.response.data : error.message);
        }
    } else {
        console.error('No token found, user not authenticated');
    }
});
</script>

<style scoped></style>
