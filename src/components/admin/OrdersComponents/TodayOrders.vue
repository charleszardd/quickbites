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
let debounceTimer = null;

// Function to fetch today's orders
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

// Debounced function for fetching orders
const debouncedFetchTodayOrders = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fetchTodayOrders, 300); // Adjust debounce time as needed
};

// Fetch orders on component mount
onMounted(() => {
    fetchTodayOrders();
    // Listen for new order events
    window.Echo.channel('orders').listen('NewOrderCreated', (event) => {
        orders.value.push(event.order);
        debouncedFetchTodayOrders(); // Call the debounced fetch when a new order is created
    });
});

defineExpose({ fetchTodayOrders });
</script>

<style></style>
