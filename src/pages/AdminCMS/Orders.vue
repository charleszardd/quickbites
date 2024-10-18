<template>
    <div>
        <v-card>
            <v-layout>
                <AdminSidebar />
                <v-main>
                    <v-app class="px-5 py-5">
                        <v-col>
                            <v-col>
                                <h1 class="page-title">Orders</h1>
                            </v-col>

                            <v-col>
                                <v-row>
                                    <v-card max-width="200" class="custom-radius d-flex align-center justify-center">
                                        <v-tabs v-model="tab" color="primary">
                                            <v-tab class="custom-radius my-auto" value="today">Today</v-tab>
                                            <v-tab class="custom-radius my-auto" value="history">History</v-tab>
                                        </v-tabs>
                                    </v-card>

                                    <v-spacer></v-spacer>

                                    <RefreshButton @refresh="fetchData" :loading="loading" class="me-3" />
                                    <ManualOrder />

                                </v-row>
                            </v-col>

                            <v-card-text>
                                <v-tabs-window v-model="tab">
                                    <v-tabs-window-item value="today">
                                        <TodayOrders v-if="tab === 'today'" />
                                    </v-tabs-window-item>

                                    <v-tabs-window-item value="history">
                                        <HistoryOrders v-if="tab === 'history'" />
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card-text>
                        </v-col>
                    </v-app>
                </v-main>
            </v-layout>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useOrderStore } from '@/stores/Admin/OrderPinia';

const tab = ref('today');

const orderStore = useOrderStore();
const loading = ref(false);

const fetchData = async () => {
    loading.value = true;
    try {
        await orderStore.fetchOrders();
    } catch (error) {
        console.error("Failed to fetch orders:", error);
    } finally {
        loading.value = false;
    }
};
</script>

<style></style>
