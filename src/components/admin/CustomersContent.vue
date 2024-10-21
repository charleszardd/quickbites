<template>
    <div>
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
                        <td class="text-left">{{ customer.id }}</td>
                        <td class="text-left">{{ customer.last_name }}, {{ customer.first_name }}</td>
                        <td class="text-left">{{ customer.email }}</td>
                        <td class="text-left">{{ customer.phone_number || 'N/A' }}</td>
                        <td class="text-left">₱ {{ customer.balance }}</td>
                        <td class="text-left">
                            <v-btn @click="openDetailsModal(customer)" prepend-icon="mdi-account-details-outline"
                                color="primary" variant="tonal">View Details</v-btn>
                            <v-btn @click="openDeleteModal(customer)" prepend-icon="mdi-trash-can-outline" color="error"
                                variant="text" class="custom-radius">Delete</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <Modal v-model="modalVisible" title="Remove Customer" icon="mdi-alert" max-width="800px">
            <div>
                Are you sure you want to remove <b>{{ customerToDelete.first_name }} {{ customerToDelete.last_name
                    }}</b> as customer?
            </div>
            <v-card-actions slot="actions">
                <v-btn @click="closeModal">Cancel</v-btn>
                <v-btn color="primary" @click="confirmDelete">Confirm</v-btn>
            </v-card-actions>
        </Modal>

        <CustomerDetailModal :key="detailModalKey" :visible="detailModalVisible" :customer="selectedCustomer"
            @update:visible="handleModalClose" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCustomerStore } from '@/stores/Admin/CustomerPinia';

const customerStore = useCustomerStore();

const modalVisible = ref(false);
const detailModalVisible = ref(false);
const selectedCustomer = ref(null);
const customerToDelete = ref(null);
const detailModalKey = ref(0);

const openDeleteModal = (customer) => {
    customerToDelete.value = customer;
    modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
    customerToDelete.value = null;
};

const openDetailsModal = (customer) => {
    selectedCustomer.value = customer;
    detailModalVisible.value = true;
    detailModalKey.value += 1;
};

const handleModalClose = (value) => {
    detailModalVisible.value = value;
    if (!value) {
        selectedCustomer.value = null;
    }
};

onMounted(() => {
    customerStore.fetchCustomers();
});
</script>
