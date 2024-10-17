import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrderStore = defineStore('OrderStore', {
    state: () => ({
        orders: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchOrders() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('/api/orders');
                this.orders = response.data;
            } catch (error) {
                this.error = 'Failed to fetch orders.';
            } finally {
                this.loading = false;
            }
        },
    },
});
