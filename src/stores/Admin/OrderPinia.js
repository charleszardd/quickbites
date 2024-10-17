import { defineStore } from 'pinia';
import axios from 'axios';

export const useOrderStore = defineStore('order', {
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
            } catch (err) {
                this.error = 'Failed to fetch orders: ' + err.message;
            } finally {
                this.loading = false;
            }
        },
    },
});
