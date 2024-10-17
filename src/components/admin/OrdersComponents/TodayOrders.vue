<template>
    <v-col>
        <v-row v-if="!loading && !error">
            <OrderCard v-for="order in orders" :key="order.id" :order="order" />
        </v-row>
        <v-row v-if="loading">
            <p>Loading orders...</p>
        </v-row>
        <v-row v-if="error">
            <p>{{ error }}</p>
        </v-row>
    </v-col>
</template>

<script setup>
import { onMounted } from 'vue';
import { useOrderStore } from '@/stores/Admin/OrderPinia';

const orderStore = useOrderStore();
const { orders, fetchOrders, loading, error } = orderStore;

onMounted(() => {
    fetchOrders();
});
</script>