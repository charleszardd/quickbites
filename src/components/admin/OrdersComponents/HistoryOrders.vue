<template>
    <v-col>
        <v-row>
            <OrderCard v-for="order in orders" :key="order.id" :order="order" />
        </v-row>
    </v-col>
</template>

<script setup>
import { ref } from 'vue';

const orders = ref([
    {
        id: 1,
        customer: 'Joshua Paulo Ynzon',
        orderStatus: 'Complete',
        date: 'October 17, 2024',
        time: '2:54 PM',
        paymentMethod: 'Wallet',
        items: [
            { id: 1, name: 'Fried Chicken', quantity: 2, price: 25 },
            { id: 2, name: 'Grilled Fish', quantity: 1, price: 50 },
            { id: 3, name: 'Beef Steak', quantity: 1, price: 300 },
        ],
    },
    {
        id: 2,
        customer: 'Maria Clara',
        orderStatus: 'Complete',
        date: 'October 17, 2024',
        time: '3:00 PM',
        paymentMethod: 'Cash',
        items: [
            { id: 1, name: 'Caesar Salad', quantity: 3, price: 80 },
            { id: 2, name: 'Pasta Alfredo', quantity: 1, price: 150 },
            { id: 3, name: 'Lemonade', quantity: 4, price: 25 },
        ],
    },
]);
</script>
