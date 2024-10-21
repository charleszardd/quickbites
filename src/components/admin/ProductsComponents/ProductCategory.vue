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
            <ProductTable :products="products" :updateProduct="updateProduct" :deleteProduct="deleteProduct" />
        </v-row>
    </v-col>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import axios from 'axios';

const props = defineProps({
    category: {
        type: String,
        required: true,
    },
});

const loading = ref(true);
const error = ref(null);
const products = ref([]);

const fetchProducts = async () => {
    loading.value = true;
    try {
        const response = await axios.get(`/api/products?category=${props.category}`);
        products.value = response.data.products;
    } catch (err) {
        error.value = `Failed to fetch ${props.category}. Please try again.`;
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const updateProduct = async (product) => {
    try {
        await axios.put(`/api/products/${product.id}`, {
            name: product.name,
            stock_quantity: product.stock_quantity,
            price: product.price,
        });
        window.$snackbar('Product updated successfully', 'success');
        product.isEditing = false;
    } catch (error) {
        if (error.response && error.response.data) {
            window.$snackbar(error.response.data.message || 'An error occurred while updating the product.', 'error');
        } else {
            window.$snackbar('An unknown error occurred. Please try again later.', 'error');
        }
    }
};

const deleteProduct = async (productId) => {
    try {
        await axios.delete(`/api/products/${productId}`);
        window.$snackbar('Product deleted successfully', 'success');
        products.value = products.value.filter(product => product.id !== productId);
    } catch (error) {
        window.$snackbar(error.response.data.message || 'An error occurred while deleting the product.', 'error');
    }
};

onMounted(fetchProducts);
</script>

<style></style>
