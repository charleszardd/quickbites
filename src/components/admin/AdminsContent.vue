<template>
    <div>
        <v-card v-for="admin in adminStore.admins" :key="admin.id" class="custom-card">
            <v-card-title>{{ admin.first_name }} {{ admin.last_name }}</v-card-title>
            <v-card-subtitle>{{ admin.email }}</v-card-subtitle>
            <v-card-text>
                Role: {{ getRoleName(admin.role_id) }}
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '@/stores/Admin/AdminPinia';

const adminStore = useAdminStore();

onMounted(() => {
    adminStore.fetchAdmins();
    adminStore.fetchRoles();
});

function getRoleName(roleId) {
    const role = adminStore.roles.find((role) => role.id === roleId);
    return role ? role.name : 'Unknown';
}
</script>
