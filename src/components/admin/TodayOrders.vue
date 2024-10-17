<template>
    <div>
        <v-card class="custom-radius" max-width="500">
            <v-col>
                <div class="d-flex flex-wrap align-center justify-space-between">
                    <h3>Joshua Paulo Ynzon</h3>
                    <div class="rounded-lg px-3 py-1 bg-pending">
                        <p>
                            <v-icon>mdi-receipt-clock-outline</v-icon>
                            Pending
                        </p>
                    </div>
                </div>

                <div class="d-flex flex-wrap align-center justify-space-between">
                    <span>Order 2022213 / Wallet, Paid</span>
                    <div>
                        <span class="pending">
                            <v-icon>mdi-circle-medium</v-icon>
                            Incoming Order
                        </span>
                    </div>
                </div>

                <div class="d-flex flex-wrap my-3 align-center justify-space-between">
                    <span>October 17, 2024</span>
                    <span>2:38 PM</span>
                </div>

                <v-divider></v-divider>

                <v-table>
                    <tbody>
                        <tr>
                            <td class="text-left pending">Items</td>
                            <td class="text-center pending">Qty</td>
                            <td class="text-right pending">Price</td>
                        </tr>
                        <tr>
                            <td class="text-left">Fried Chicken</td>
                            <td class="text-center">5</td>
                            <td class="text-right">₱125</td>
                        </tr>
                        <tr>
                            <td class="text-left">Fried Chicken</td>
                            <td class="text-center">5</td>
                            <td class="text-right">₱125</td>
                        </tr>
                        <tr>
                            <td class="text-left">Fried Chicken</td>
                            <td class="text-center">5</td>
                            <td class="text-right">₱125</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-card>
    </div>
</template>

<script setup>
</script>

<style>
.v-table td {
    border-bottom: none !important;
    margin: 0 !important;
    padding: 0 !important;
}
</style>