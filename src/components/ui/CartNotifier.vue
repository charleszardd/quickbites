<template>
  <v-menu offset-y width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn icon v-bind="activatorProps" class="mr-5" to="/cart">
        <v-badge color="error" v-if="cart.getProductCount() > 0" :content="cart.getProductCount()">
          <v-icon color="primary">mdi-cart</v-icon>
        </v-badge>
        <v-icon color="primary" v-else>
          mdi-cart
        </v-icon>
      </v-btn>
    </template>
  </v-menu>
</template>

<script setup>
import { computed } from 'vue';
import { cart } from '@/stores/cart';

const cartCount = computed(() => cart.getProductCount());
</script>
