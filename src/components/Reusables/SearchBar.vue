<template>
    <v-row class="mt-1 mb-5">
        <v-row class="justify-center ">
            
            <v-text-field  v-model="localSearchQuery" class="w-100 custom-radius" height="30px"
                :label="searchLabel" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details="auto"
                @input="emitSearchQuery" />
        </v-row>
    </v-row>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Search',
    },
    searchLabel: {
        type: String,
        default: 'Search for an item',
    },
    modelValue: {
        type: String,
        default: '',
    },
});

const localSearchQuery = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    localSearchQuery.value = newValue;
});

const emit = defineEmits(['update:modelValue']);
const emitSearchQuery = () => {
    emit('update:modelValue', localSearchQuery.value);
};


</script>