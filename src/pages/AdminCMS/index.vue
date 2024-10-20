<template>
    <div>
        <v-card>
            <v-layout>
                <v-main>
                    <v-app>
                        <div class="d-flex">
                            <div class="left-container w-100 my-auto">
                                <v-col>
                                    <v-col>
                                        <h1 class="page-title">Quick Bites</h1>
                                    </v-col>

                                    <v-col>
                                        <div class="mb-5">
                                            <h3 class="form-title">Admin CMS</h3>
                                            <p class="description">Login to your account</p>
                                        </div>

                                        <div>
                                            <v-text-field v-model="form.email" type="email" :rules="rules"
                                                label="Email address" class="custom-radius" variant="outlined" />
                                            <v-text-field v-model="form.password" type="password" :rules="rules"
                                                label="Password" class="custom-radius" variant="outlined" />
                                            <v-btn type="submit" @click="login" :loading="loading"
                                                class="my-2 custom-radius" height="50px" color="primary" block>Sign
                                                in</v-btn>
                                            <router-link>Forgot password?</router-link>
                                        </div>
                                    </v-col>
                                </v-col>
                            </div>
                            <div class="right-container">
                                <div class="overlay"></div>
                                <img src="../../../girl-eating.jpg" class="cover-image" height="100%" width="100%" />
                            </div>
                        </div>
                    </v-app>
                </v-main>
            </v-layout>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { setAuth } from "./adminAuthServiceProvider/adminAuthService";

const loading = ref(false);
const form = ref({
    email: "",
    password: "",
});

const login = async () => {
    loading.value = true;
    try {
        const response = await axios.post("/api/admin/login", {
            email: form.value.email,
            password: form.value.password,
        });

        if (
            response &&
            response.data &&
            response.data.token &&
            response.data.admin
        ) {
            // Assuming the response data contains the admin's role ID
            const { token, admin } = response.data;

            // Store the token and admin role_id (or any unique identifier for the role)
            setAuth(token, admin); // Modify this if your setAuth function needs to store role_id

            // Store role_id in local storage if it's part of the admin object
            localStorage.setItem('role_id', admin.role_id); // Ensure `role_id` exists in `admin`

            window.$snackbar("Successful! Logging in...", `success`);
            setTimeout(() => {
                window.location.href = "/admincms/dashboard";
            }, 3000);
        } else {
            window.$snackbar(`Oops! Something went wrong.`, "error");
        }
    } catch (error) {
        if (error.response) {
            error.response.data.message ||
                window.$snackbar("Invalid credentials!", "error");
        } else {
            window.$snackbar("Invalid credentials!", "error");
        }
    } finally {
        loading.value = false;
    }
};

</script>

<style scoped>
.left-container {
    max-width: 600px;
}

.right-container {
    max-height: 100vh;
    max-width: 200vh;
    height: 100%;
    width: 100%;
    position: relative;
}

.overlay {
    position: absolute;
    background-image: linear-gradient(to right, #FC8019, #09AA29);
    height: 100%;
    width: 100%;
    opacity: 50%;
}

.cover-image {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
}
</style>
