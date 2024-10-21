import { defineStore } from 'pinia';
import axios from 'axios';

export const useCustomerStore = defineStore('customerStore', {
    state: () => ({
        customers: [],
    }),

    actions: {
        async fetchCustomers() {
            try {
                const response = await axios.get('/api/customers');
                this.customers = response.data;
            } catch (error) {
                console.error("Error fetching admins:", error);
            }
        },
    },
});
