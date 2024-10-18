<template>
    <div ref="animationContainer" :style="{ width, height }"></div>
</template>

<script setup>
import lottie from 'lottie-web';
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';

// Define props for the component
const props = defineProps({
    animationData: {
        type: Object,
        required: true, // The Lottie animation data
    },
    width: {
        type: String,
        default: '400px', // Default width
    },
    height: {
        type: String,
        default: '400px', // Default height
    },
});

const animationContainer = ref(null);
let animationInstance;

onMounted(() => {
    animationInstance = lottie.loadAnimation({
        container: animationContainer.value, // the DOM element that will contain the animation
        renderer: 'svg', // 'canvas', 'svg', or 'html'
        loop: true, // loop the animation
        autoplay: true, // start playing the animation immediately
        animationData: props.animationData, // use animation data prop
    });
});

onBeforeUnmount(() => {
    animationInstance.destroy(); // clean up the animation instance
});
</script>

<style scoped>
/* Optional styles for the animation container */
div {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
