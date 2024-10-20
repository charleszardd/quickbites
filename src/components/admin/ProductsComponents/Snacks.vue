<template>
    <v-col>
        <v-row v-if="loading">
            <p>Loading products...</p>
        </v-row>
        <v-row v-if="error">
            <p>{{ error }}</p>
        </v-row>
        <v-row v-if="!loading && !error && products.length === 0">
            <p>No products available.</p>
        </v-row>
        <v-row>
            <ProductTable :products="products" />
        </v-row>
    </v-col>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const loading = ref(true);
const error = ref(null);
const products = ref([]);

const fetchProducts = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/products?category=snacks');
        products.value = response.data.products;
    } catch (err) {
        error.value = 'Failed to fetch meals. Please try again.';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchProducts);
defineExpose({ fetchProducts });
</script>

<style></style>
