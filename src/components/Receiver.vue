<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">New Message Received</span>
            </v-card-title>
            <v-card-text>
                <p>{{ receivedMessage }}</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="close">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import eventBus from '@/utils/EventBus.js'; // Adjust the path as necessary

const dialog = ref(false);
const receivedMessage = ref('');

// Function to open the modal
const open = (message) => {
    console.log("Received message:", message); // Debugging line
    receivedMessage.value = message;
    dialog.value = true;
};

// Function to close the modal
const close = () => {
    dialog.value = false;
};

// Listen for the message event
onMounted(() => {
    eventBus.on('messageSent', open);
});
</script>
