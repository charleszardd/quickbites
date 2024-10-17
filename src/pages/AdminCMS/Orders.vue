<template>
    <div>
        <v-card>
            <v-layout>
                <AdminSidebar />
                <v-main>
                    <v-app class="px-5 py-5">
                        <v-card max-width="200" class="custom-radius d-flex align-center justify-center">
                            <v-tabs v-model="tab" color="primary">
                                <v-tab class="custom-radius my-auto" max-height="40px" value="today">Today</v-tab>
                                <v-tab class="custom-radius my-auto" max-height="40px" value="history">History</v-tab>
                            </v-tabs>
                        </v-card>

                        <v-card-text>
                            <v-tabs-window v-model="tab">
                                <v-tabs-window-item value="today">
                                    <TodayOrders />
                                </v-tabs-window-item>

                                <v-tabs-window-item value="history">
                                    <HistoryOrders />
                                </v-tabs-window-item>
                            </v-tabs-window>
                        </v-card-text>
                    </v-app>
                </v-main>
            </v-layout>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const tab = ref('today');
</script>

<style></style>
