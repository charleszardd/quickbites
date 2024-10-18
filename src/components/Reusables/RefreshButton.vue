<template>
    <v-btn :disabled="loading" @click="refreshData" class="custom-radius" prepend-icon="mdi-refresh" height="50">
        <template v-if="loading">
            <v-progress-circular indeterminate size="24" color="white" />
        </template>
        <template v-else>
            Refresh Data
        </template>
    </v-btn>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['refresh']);

const refreshData = () => {
    emit('refresh');
};
</script>
