<template>
    <div class="not-found">
        <v-col align="center">
            <LottieAnimation :animationData="NotFound" width="300px" height="300px" />
            <p>The page you are looking for does not exist.</p>
            <router-link to="/">Go back to home</router-link>
        </v-col>
    </div>
</template>

<script setup>
import NotFound from "../Lottie/404.json";

</script>

<style>
.not-found {
    text-align: center;
    margin-top: 50px;
}
</style>
