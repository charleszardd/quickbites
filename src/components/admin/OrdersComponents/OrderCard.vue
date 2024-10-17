<template>
    <v-card class="custom-radius w-100 me-5 mb-5" :max-width="400">
        <v-col>
            <div class="d-flex flex-wrap align-center justify-space-between">
                <h3>{{ order.customer.first_name }} {{ order.customer.last_name }}</h3>
                <div class="rounded-lg px-3 py-1 bg-pending">
                    <p>
                        <v-icon>mdi-receipt-clock-outline</v-icon>
                        {{ order.order_status.name }}
                    </p>
                </div>
            </div>

            <div class="d-flex flex-wrap align-center justify-space-between">
                <span>Order {{ order.id }} / {{ order.cart.payment_method ? order.cart.payment_method.name :
                    'Not Specified'
                    }},
                    Paid</span>
                <div>
                    <span class="pending">
                        <v-icon>mdi-circle-medium</v-icon>
                        Incoming Order
                    </span>
                </div>
            </div>

            <div class="d-flex flex-wrap mt-3 align-center justify-space-between">
                <span>{{ new Date(order.created_at).toLocaleDateString() }}</span>
                <span>{{ new Date(order.created_at).toLocaleTimeString() }}</span>
            </div>

            <v-divider class="my-3" />

            <div v-if="order.reason" class="my-2">
                <p><strong>Cancellation Reason:</strong> {{ order.reason.description }}</p>
            </div>

            <v-table>
                <thead>
                    <tr>
                        <th class="text-left pending">Items</th>
                        <th class="text-center pending">Qty</th>
                        <th class="text-right pending">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in order.cart.cart_items" :key="item.id">
                        <td class="text-left">{{ item.product.name }}</td>
                        <td class="text-center">{{ item.quantity }}</td>
                        <td class="text-right">₱{{ item.price }}</td>
                    </tr>
                </tbody>
            </v-table>

            <v-divider class="my-3" />

            <div class="d-flex flex-wrap my-3 align-center justify-space-between">
                <b>Total</b>
                <b>₱{{ order.cart.total }}</b>
            </div>

            <v-col>
                <v-row class="action-buttons mt-auto">
                    <v-btn @click="showCancelDialog" class="custom-radius" color="primary" variant="tonal" height="50px"
                        width="25%" flat>
                        Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="custom-radius" color="primary" height="50px" width="70%" flat>
                        Accept
                    </v-btn>
                </v-row>
            </v-col>
        </v-col>

        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title>
                    <span>Select Reason for Cancellation</span>
                </v-card-title>
                <v-card-text>
                    <v-select v-model="selectedReason" :items="reasons" label="Choose a reason" return-object
                        required></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="confirmCancellation">Confirm</v-btn>
                    <v-btn @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script setup>
import axios from 'axios';
import { ref, defineProps } from 'vue';

defineProps({
    order: Object,
});

const dialog = ref(false);
const selectedReason = ref(null);
const reasons = ref([]);

const showCancelDialog = () => {
    dialog.value = true;
    fetchReasons();
};

const confirmCancellation = () => {
    if (selectedReason.value) {
        console.log('Order cancelled with reason:', selectedReason.value);
        dialog.value = false;
    }
};

const fetchReasons = async () => {
    try {
        const response = await axios.get('/api/reasons');
        reasons.value = response.data;
    } catch (error) {
        console.error('Error fetching reasons:', error);
    }
};
</script>

<style scoped>
.v-table td,
th {
    border-bottom: none !important;
    margin: 0 !important;
    padding: 0 !important;
    height: 30px !important;
}
</style>
