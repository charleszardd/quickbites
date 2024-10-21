<template>
    <Modal v-model="localVisible" class="main-modal" title="Customer Detail" icon="mdi-account-details-outline"
        :height="'100vh'" :width="'500px'">
        <v-card-text>
            <div v-if="customer">
                <v-col>
                    <v-row>
                        <v-card class="custom-radius d-flex align-center justify-center bg-primary" height="100px"
                            width="100px">
                            <v-img v-if="customer && customer.profile_picture !== null"
                                :src="customer.profile_picture" />
                            <h1 v-else class="name-initial">{{ customer?.first_name[0] }}{{ customer?.last_name[0] }}
                            </h1>
                        </v-card>
                        <v-col class="mt-auto">
                            <h2 class="fullname">{{ customer?.first_name }} {{ customer?.last_name }}</h2>
                            <p><i>{{ customer?.email }}</i></p>
                            <p><i>{{ customer.phone_number || 'N/A' }}</i></p>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col>
                    <v-card elevation="2" class="custom-radius">
                        <div class="text-center">
                            <v-card-actions class="d-flex justify-end">
                                <v-btn @click="openAddCreditsModal" prepend-icon="mdi-cash-plus" class="custom-radius"
                                    color="secondary">
                                    Add Credits
                                </v-btn>
                            </v-card-actions>
                            <v-card-title class="d-flex align-center justify-center">
                                ₱ <h1>{{ customer.balance ? customer.balance.toLocaleString() : '0' }}</h1>
                            </v-card-title>
                            <v-card-text>Balance</v-card-text>
                        </div>
                    </v-card>
                </v-col>

                <Modal v-model="addCreditsDialog" title="Add Credits" icon="mdi-cash-plus" class="add-credits"
                    max-width="300px">

                    <v-card-text>
                        <v-text-field v-model="creditAmount" label="Enter credit amount" type="number"
                            variant="outlined" />
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn text @click="addCreditsDialog = false">Cancel</v-btn>
                        <v-btn color="primary" @click="addCredits">Add</v-btn>
                    </v-card-actions>
                </Modal>
            </div>
            <div v-else>Loading...</div>
        </v-card-text>
    </Modal>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    customer: {
        type: Object,
        required: false,
    },
});

const emit = defineEmits(['update:visible']);
const localVisible = ref(props.visible);
const addCreditsDialog = ref(false);
const creditAmount = ref(0);

watch(() => props.visible, (newValue) => {
    localVisible.value = newValue;
});

const openAddCreditsModal = () => {
    addCreditsDialog.value = true;
};

const addCredits = async () => {
    if (creditAmount.value > 0 && props.customer) {
        try {
            await axios.post(`/api/customers/${props.customer.id}/add-credits`, { amount: creditAmount.value });
            props.customer.balance += Number(creditAmount.value);
            addCreditsDialog.value = false;
        } catch (error) {
            console.error('Error adding credits:', error);
        }
    }
};
</script>

<style scoped></style>