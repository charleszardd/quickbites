<template>
    <div>
        <v-card>
            <v-layout>
                <v-main>
                    <v-app>
                        <div class="d-flex">
                            <div class="left-container w-100 my-auto">
                                <v-col>
                                    <h1 class="page-title">Quick Bites</h1>
                                </v-col>

                                <v-col>
                                    <div class="mb-5">
                                        <h3 class="form-title">Admin CMS</h3>
                                        <p class="description">Login to your account</p>
                                    </div>

                                    <v-form @submit.prevent>
                                        <v-text-field v-model="email" type="email" :rules="rules" label="Email address"
                                            class="custom-radius" variant="outlined" />
                                        <v-text-field v-model="password" type="password" :rules="rules" label="Password"
                                            class="custom-radius" variant="outlined" />
                                        <v-btn class="my-2 custom-radius" height="50px" color="primary" type="submit"
                                            block>Sign in</v-btn>
                                        <router-link>Forgot password?</router-link>
                                    </v-form>
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
