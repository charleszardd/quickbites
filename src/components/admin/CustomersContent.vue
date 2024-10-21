<template>
    <div>
        <AddAdmin />
        <v-card class="custom-radius">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">ID</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Phone number</th>
                        <th class="text-left">Balance</th>
                        <th class="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in customerStore.customers" :key="customer.id">
                        <td class="text-left">
                            {{ customer.last_name }}, {{ customer.first_name }}
                        </td>
                        <td class="text-left">
                            {{ customer.email }}
                        </td>
                        <td class="text-left">
                            {{ customer.phone_number || 'N/A' }}
                        </td>
                        <td class="text-left">
                            {{ customer.balance }}
                        </td>
                        <td class="text-left">
                            <v-btn @click="editAdmin(admin.id)" prepend-icon="mdi-square-edit-outline" color="blue"
                                variant="text" class="custom-radius me-3">
                                Edit
                            </v-btn>

                            <v-btn @click="openDeleteModal(admin)" prepend-icon="mdi-trash-can-outline" color="error"
                                variant="text" class="custom-radius">
                                Delete
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <Modal v-model="modalVisible" title="Remove Admin" icon="mdi-alert" max-width="800px">
            <div>
                Are you sure you want to remove <b>{{ customerToDelete.first_name }} {{ adminToDelete.last_name }}</b>
                as
                admin?
            </div>
            <v-card-actions slot="actions">
                <v-btn @click="closeModal">Cancel</v-btn>
                <v-btn color="primary" @click="confirmDelete">Confirm</v-btn>
            </v-card-actions>
        </Modal>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCustomerStore } from '@/stores/Admin/AdminPinia';

const customerStore = useCustomerStore();

const modalVisible = ref(false);
const customerToDelete = ref(null);

const openDeleteModal = (admin) => {
    customerToDelete.value = admin;
    modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
    customerToDelete.value = null;
};

onMounted(() => {
    customerStore.fetchCustomers();
});

function editCustomer(customerId) {
    // Logic to handle editing, e.g., redirecting to an edit page
}

async function confirmDelete() {
    if (!customerToDelete.value) return;

    try {
        await axios.delete(`/api/customers/${customerToDelete.value.id}`);
        window.$snackbar('Customer deleted successfully', 'success');

        customerStore.customers = customerStore.customers.filter(customer => customer.id !== adminToDelete.value.id);

        closeModal();
    } catch (error) {
        window.$snackbar(error.response?.data?.message || 'An error occurred while deleting admin.', 'error');
    }
}
</script>
