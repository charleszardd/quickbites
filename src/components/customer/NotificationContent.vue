<template>
    <div>
        <v-row class="header-holder mt-1 mb-10 align-center">
            <v-btn to="/" variant="text" color="black" icon="mdi-arrow-left" />
            <h2 class="page-title mx-auto">Notifications</h2>
        </v-row>

        <v-card :to="`orderdetails/${notification.order_id}`" @click="markAsRead(notification)"
            v-for="notification in notificationStore.getNotifications" :key="notification.id"
            :class="notification.is_read ? 'bg-grey-lighten-2' : ''" flat>
            <v-card-text>
                <p>{{ notification.order_number }}</p>

                <div class="d-flex justify-space-between mb-3">
                    <p><strong>{{ notification.message }}</strong></p>
                    <p v-if="!notification.is_read">Unread</p>
                </div>

                <small>{{ formatDate(notification.created_at) }}</small>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { getAuth } from '@/pages/auth/authServiceProvider/authService';

const notificationStore = useNotificationStore();

const fetchNotifications = async () => {
    const { customer } = getAuth();
    if (customer) {
        await notificationStore.fetchNotifications(customer.id);
    }
};

const markAsRead = async (notification) => {
    if (!notification.is_read) {
        await notificationStore.markAsRead(notification.id);
        notification.is_read = true;
    }
};

onMounted(fetchNotifications);

const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(new Date(date));
};
</script>

<style scoped>
.page-title {
    translate: -15px;
}
</style>
