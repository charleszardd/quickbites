<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" sm="8" md="4" class="login-col">
        <div class="text-h6 mb-5">Create an account</div>
        <v-form ref="formRef" v-model="isFormValid" @submit.prevent="register">
          <v-text-field
            v-model="form.firstName"
            :rules="[rules.required]"
            label="Enter your first name"
            variant="outlined"
            class="custom-radius"
          ></v-text-field>

          <v-text-field
            v-model="form.lastName"
            :rules="[rules.required]"
            label="Enter your last name"
            variant="outlined"
            class="custom-radius"
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            :rules="[rules.required, rules.email]"
            type="email"
            label="Enter your email address"
            variant="outlined"
            class="custom-radius"
          ></v-text-field>
          <v-text-field
            v-model="form.phoneNumber"
            type="number"
            label="Enter your phone number (optional)"
            variant="outlined"
            class="custom-radius"
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :rules="[rules.required, rules.min]"
            type="password"
            required
            label="Enter your password"
            variant="outlined"
            class="custom-radius"
          ></v-text-field>
          <v-text-field
            v-model="form.confirmPassword"
            :rules="[rules.required, confirmPasswordRule]"
            required
            type="password"
            label="Enter your confirm password"
            variant="outlined"
            class="custom-radius"
          ></v-text-field>

          <div class="checkbox-container">
            <v-checkbox value="value"></v-checkbox>
            <router-link class="terms-text" to="/terms"
              >Terms and Condition</router-link
            >
          </div>
          
        </v-form>
        <v-btn
          type="submit"
          @click="submitForm"
          :loading="loading"
          height="53"
          class="button-text w-100 mt-1"
          >Sign Up</v-btn
        >
        <div class="mt-4">
          <p>
            Already have an account?
            <router-link to="/auth/login" class="login-link"
              >Log in</router-link
            >
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const formRef = ref(null);
const isFormValid = ref(false);
const loading = ref(false);
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
});

const resetForm = () => {
  form.value = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
};

const rules = {
  required: (value) => !!value || "Required.",
  email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
  min: (value) =>
    value.length >= 10 || "Password must be at least 10 characters.",
};

const confirmPasswordRule = (value) =>
  value === form.value.password || "Passwords must match.";

const register = async () => {
  loading.value = true;
  try {
    const response = await axios.post(
      "/api/register",
      {
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email: form.value.email,
        phone_number: form.value.phoneNumber,
        password: form.value.password,
        password_confirmation: form.value.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.$snackbar(`Registration completed successfully!`, `success`);
    setTimeout(() => {
      window.location.href = `/auth/login`;
    }, 3000);
  } catch (error) {
    window.$snackbar(`Please fill in all required fields!`, `error`);
  } finally {
    loading.value = false;
    resetForm();
  }
};

const submitForm = () => {
  if (formRef.value.validate()) {
    register();
  }
};
</script>
<style scoped>
.checkbox-container{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.terms-text {
  color: #171826;
  align-items: center;
}
.button-text {
  background-color: #171826;
  color: white;
}
.login-link {
  text-decoration: underline;
  color: #171826;
}
</style>