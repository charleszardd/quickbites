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
import { onMounted, ref } from 'vue';

const dialog = ref(false);
const receivedMessage = ref('');

onMounted(() => {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            }
        });
    }

    // Listen for the message event
    window.Echo.channel('chat').listen('MessageSent', (event) => {
        open(event.message);

        // Show a notification if permission is granted
        if (Notification.permission === 'granted') {
            new Notification('New Message', {
                body: event.message,
            });
        }
    });
});

const open = (message) => {
    receivedMessage.value = message;
    dialog.value = true;
};

const close = () => {
    dialog.value = false;
};
</script>
