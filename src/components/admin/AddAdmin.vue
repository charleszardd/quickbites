<template>
    <div>
        <v-btn color="primary" @click="showModal" class="custom-radius" prepend-icon="mdi-plus" height="50">
            Add Admin
        </v-btn>

        <Modal v-model="isModalVisible" title="Add New Admin" icon="mdi-account-plus">
            <v-form ref="adminForm" v-model="formValid" @submit.prevent="registerAdmin">
                <v-text-field label="First Name" v-model="form.first_name" :rules="[rules.required]"></v-text-field>

                <v-text-field label="Last Name" v-model="form.last_name" :rules="[rules.required]"></v-text-field>

                <v-text-field label="Email" v-model="form.email" :rules="[rules.required, rules.email]"></v-text-field>

                <v-card-actions slot="actions">
                    <v-btn @click="closeModal">Cancel</v-btn>
                    <v-btn type="submit" :disabled="!formValid">Submit</v-btn>
                </v-card-actions>
            </v-form>
        </Modal>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue', 'admin-added']);
const isModalVisible = ref(props.modelValue);
const form = ref({
    first_name: '',
    last_name: '',
    email: '',
});
const formValid = ref(false);

const rules = {
    required: value => !!value || 'Required.',
    email: value => /.+@.+/.test(value) || 'E-mail must be valid.',
};

watch(() => props.modelValue, (newValue) => {
    isModalVisible.value = newValue;
});

const showModal = () => {
    isModalVisible.value = true;
    emit('update:modelValue', true);
};

const closeModal = () => {
    isModalVisible.value = false;
    emit('update:modelValue', false);
    form.value = { first_name: '', last_name: '', email: '' };
};

const registerAdmin = async () => {
    try {
        await axios.post('/api/admin/register', form.value);
        closeModal();
        emit('admin-added');
        alert('Admin successfully registered');
    } catch (error) {
        console.error('Error adding admin:', error.response.data);
    }
};
</script>
