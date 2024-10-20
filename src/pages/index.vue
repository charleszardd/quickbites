<template>
  <MenuContent />
</template>
<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { isLoggedIn } from '../pages/auth/authServiceProvider/authService';

const router = useRouter();

onMounted(() => {
  if(!isLoggedIn()){
    router.replace('/');
  } else{
    router.replace('/');
  }
});
</script>
