<template>
    <v-col>
        <v-row v-if="loading">
            <p>Loading orders...</p>
        </v-row>
        <v-row v-if="error">
            <p>{{ error }}</p>
        </v-row>
        <v-row v-if="!loading && !error && orders.length === 0">
            <p>No orders available for today.</p>
        </v-row>
        <v-row v-if="!loading && !error && orders.length > 0">
            <OrderCard v-for="order in orders" :key="order.id" :order="order" />
        </v-row>
    </v-col>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const loading = ref(true);
const error = ref(null);
const orders = ref([]);

const fetchTodayOrders = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/orders/today');
        orders.value = response.data;
    } catch (err) {
        error.value = 'Failed to fetch today’s orders. Please try again.';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchTodayOrders);
defineExpose({ fetchTodayOrders });
</script>

<style></style>
