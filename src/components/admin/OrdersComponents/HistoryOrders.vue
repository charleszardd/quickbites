<template>
    <v-col>
        <v-row v-if="loading">
            <p>Loading orders...</p>
        </v-row>
        <v-row v-if="error">
            <p>{{ error }}</p>
        </v-row>
        <v-row v-if="!loading && !error && filteredOrders.length === 0">
            <p>No orders available.</p>
        </v-row>
        <v-row v-if="!loading && !error && filteredOrders.length > 0">
            <OrderCard v-for="order in filteredOrders" :key="order.id" :order="order" />
        </v-row>
    </v-col>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useOrderStore } from '@/stores/Admin/OrderPinia';

const orderStore = useOrderStore();
const { orders, fetchOrders, loading, error } = orderStore;

const filteredOrders = computed(() => {
    return orders;
});

onMounted(() => {
    fetchOrders();
});
</script>
