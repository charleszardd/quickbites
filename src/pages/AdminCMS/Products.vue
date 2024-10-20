<template>
    <div>
        <v-card>
            <v-layout>
                <v-main>
                    <v-app class="px-5 py-5">
                        <v-col>
                            <v-col>
                                <h1 class="page-title">Products</h1>
                            </v-col>

                            <v-col>
                                <v-row>
                                    <v-card class="custom-radius d-flex align-center justify-center">
                                        <v-tabs v-model="tab" color="primary">
                                            <v-tab class="custom-radius my-auto" value="meals">Meals</v-tab>
                                            <v-tab class="custom-radius my-auto" value="snacks">Snacks</v-tab>
                                            <v-tab class="custom-radius my-auto" value="chips">Chips</v-tab>
                                            <v-tab class="custom-radius my-auto" value="candies">Candies</v-tab>
                                            <v-tab class="custom-radius my-auto" value="drinks">Drinks</v-tab>
                                            <v-tab class="custom-radius my-auto" value="supplies">Supplies</v-tab>
                                        </v-tabs>
                                    </v-card>

                                    <v-spacer></v-spacer>

                                    <AddNewProduct />
                                </v-row>
                            </v-col>

                            <v-card-text>
                                <v-tabs-items v-model="tab">
                                    <v-tab-item value="meals">
                                        <Meals v-if="tab === 'meals'" :loading="loading" />
                                    </v-tab-item>
                                    <v-tab-item value="snacks">
                                        <Snacks v-if="tab === 'snacks'" :loading="loading" />
                                    </v-tab-item>
                                    <v-tab-item value="chips">
                                        <Chips v-if="tab === 'chips'" :loading="loading" />
                                    </v-tab-item>
                                    <v-tab-item value="candies">
                                        <Candies v-if="tab === 'candies'" :loading="loading" />
                                    </v-tab-item>
                                    <v-tab-item value="drinks">
                                        <Drinks v-if="tab === 'drinks'" :loading="loading" />
                                    </v-tab-item>
                                    <v-tab-item value="supplies">
                                        <Supplies v-if="tab === 'supplies'" :loading="loading" />
                                    </v-tab-item>
                                </v-tabs-items>
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

const tab = ref('meals');
const loading = ref(false);
/* const todayOrdersRef = ref(null);
const historyOrdersRef = ref(null);

// Refresh method to call child fetch methods
const refreshOrders = () => {
    if (tab.value === 'today' && todayOrdersRef.value) {
        todayOrdersRef.value.fetchTodayOrders();
    } else if (tab.value === 'history' && historyOrdersRef.value) {
        historyOrdersRef.value.fetchHistoryOrders();
    }
}; */
</script>

<style></style>
