<template>
    <v-dialog v-model="isVisible" persistent>
        <v-card :style="{ height, width }" class="custom-radius">
            <v-card-title class="d-flex align-center justify-space-between">
                <div>
                    <v-icon class="me-3">{{ icon }}</v-icon>
                    <b class="headline">{{ title }}</b>
                </div>

                <v-btn icon="mdi-close" @click="close" flat></v-btn>
            </v-card-title>
            <v-card-text>
                <slot />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Default Title',
    },
    icon: {
        type: String,
        default: 'mdi-information',
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
    height: {
        type: String,
        default: 'auto',
    },
    width: {
        type: String,
        default: 'auto',
    },
});

const emit = defineEmits(['update:modelValue']);

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    isVisible.value = newValue;
});

const close = () => {
    isVisible.value = false;
    emit('update:modelValue', false);
};
</script>
