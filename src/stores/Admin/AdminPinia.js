import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('adminStore', {
    state: () => ({
        admins: [],
        roles: [],
    }),

    actions: {
        async fetchAdmins() {
            try {
                const response = await axios.get('/api/admins');
                this.admins = response.data;
            } catch (error) {
                console.error("Error fetching admins:", error);
            }
        },

        async fetchRoles() {
            try {
                const response = await axios.get('/api/roles');
                this.roles = response.data;
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        },
    },
});
