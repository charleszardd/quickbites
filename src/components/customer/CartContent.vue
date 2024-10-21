<template>
  <v-container
    fluid
    class="px-0 d-flex flex-column"
    style="max-height: 100vh; overflow: hidden"
  >
    <v-row class="d-flex pb-0 mb-0 px-0 justify-space-between align-center">
      <v-btn
        to="/"
        size="small"
        class="button-text"
        variant="text"
        color="black"
      >
        <v-icon class="justify-start">mdi-arrow-left</v-icon>
      </v-btn>
      <h2>My Cart</h2>

      <v-menu activator="parent" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            class="button-text"
            variant="text"
            size="small"
            color="black"
            v-bind="props"
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list class="dropdown-menu">
          <v-list-item @click="orderMore">
            <v-list-item-title>Order more</v-list-item-title>
          </v-list-item>

          <v-list-item @click="clearAllProducts">
            <v-list-item-title>Clear cart</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <v-row
      class="flex-grow-1"
      v-if="cartProducts.length === 0"
      style="justify-content: center; align-items: center"
    >
    </v-row>

    <v-row class="flex-grow-1" v-else>
      <v-col
        v-for="product in cartProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-row class="custom-radius product-card py-5">
          <v-card class="image-holder ml-3">
            <v-img
              :src="product.image"
              alt="Product Image"
              class="product-image"
            />
          </v-card>
          <v-col>
            <v-card-title class="text-subtitle-1">{{
              product.name
            }}</v-card-title>
            <v-row>
              <v-btn variant="text" @click="decrementQuantity(product.id)" icon>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-card-title>
                {{ product.quantity }}
              </v-card-title>
              <v-btn variant="text" @click="incrementQuantity(product.id)" icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-col>

          <v-card-subtitle class="text-subtitle-2">{{
            "₱" + product.price.toFixed(2)
          }}</v-card-subtitle>
        </v-row>
      </v-col>
    </v-row>

    <v-row
      v-if="cartProducts.length === 0"
      class="empty-holder justify-center align-center d-flex"
    >
      <LottieAnimation
        :animationData="animationData"
        width="300px"
        height="300px"
      />
      <span class="empty-title my-2">Your cart is empty.</span>
      <v-btn variant="text"
        ><router-link color="primary" class="back-menu-link" to="/"
          >Go back to menu to order</router-link
        ></v-btn
      >
    </v-row>
    <v-row v-else class="justify-space-between align-center px-4">
      <v-divider></v-divider>
      <p class="my-5">Total:</p>
      <p>₱ {{ calculateTotal(cartProducts) }}</p>
    </v-row>

    <v-col v-if="cartProducts.length > 0" class="bottom-section pb-0">
      <v-divider class="divider mb-3"></v-divider>
      <v-btn
        class="custom-radius w-100 mb-3"
        height="50"
        color="black"
        to="/checkout"
      >
        Proceed to checkout
      </v-btn>
      <v-btn
        class="custom-radius w-100 font-weight-bold mb-3"
        height="50"
        variant="tonal"
        to="/"
      >
        Order more
      </v-btn>
    </v-col>
  </v-container>
</template>

<script setup>
import { cart } from "@/stores/cart";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { calculateTotal } from "@/utils/helpers";
import Empty from "@/Lottie/empty.json";

const animationData = ref(Empty);
const router = useRouter();
const cartProducts = ref([]);

onMounted(() => {
  cartProducts.value = cart.products.value;
});

const orderMore = () => {
  router.push("/");
};

const clearAllProducts = () => {
  cart.clearCart();
};

const incrementQuantity = (productId) => {
  cart.incrementQuantity(productId);
};

const decrementQuantity = (productId) => {
  cart.decrementQuantity(productId);
};

const totalAmount = computed(() => {
  return calculateTotal(cartProducts.value);
});
</script>

<style scoped>
.button-text {
  font-size: 22px;
}
.product-card {
  display: flex;
  align-items: center;
}
.image-holder {
  width: 50px;
  height: 50px;
}
.product-image {
  width: 100%;
  height: auto;
}
.dropdown-menu {
  min-width: 50px !important;
}
.bottom-section {
  bottom: 0;
  position: absolute;
  right: 0;
}
.flex-grow-1 {
  flex-grow: 1;
}
.empty-holder {
  flex-direction: column;
  margin-top: 130px !important;
}
.empty-title {
  font-size: 20px;
}
.back-menu-link {
  text-decoration: none;
  font-size: 20px;
  color: #fc8019;
}
.back-menu-link:hover {
  text-decoration: underline;
}
</style>
