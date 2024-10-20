<template>
    <v-card class="w-100 custom-radius">
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">Image</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Availability</th>
                    <th class="text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <td class="text-left">
                        <img :src="product.image" alt="Product Image" width="50" height="50" />
                    </td>
                    <td class="text-left">{{ product.name }}</td>
                    <td class="text-left">{{ product.stock_quantity }}</td>
                    <td class="text-left">{{ product.price }}</td>
                    <td class="text-left">
                        {{ product.stock_quantity > 0 ? 'Available' : 'Out of Stock' }}
                    </td>
                    <td class="text-left">
                        <v-btn prepend-icon="mdi-square-edit-outline" class="custom-radius me-3" flat>Edit</v-btn>
                        <v-btn prepend-icon="mdi-trash-can-outline" class="custom-radius" flat>Delete</v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    products: Array,
});
</script>

<style scoped></style>
