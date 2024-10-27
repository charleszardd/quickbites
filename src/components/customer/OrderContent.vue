<template>
  <div class="py-0 mt-0 pt-0">
    <v-row v-if="loading" class="justify-center mt-5">
      <v-progress-circular
        indeterminate
        color="primary"
        size="50"
      ></v-progress-circular>
    </v-row>

    <v-row
      v-if="!loading && sortedOrders.length > 0"
      class="header-holder mt-1 mb-3"
    >
      <v-btn
        to="/"
        size="small"
        class="items button-text"
        variant="text"
        color="black"
      >
        <v-icon class="justify-start">mdi-arrow-left</v-icon>
      </v-btn>
      <h2 class="items">My Orders</h2>
    </v-row>

    <v-col
      v-if="!loading && sortedOrders.length === 0"
      class="text-center mt-5"
    >
      <h2>No orders available</h2>
      <p>
        It looks like you haven't placed any orders yet. Start ordering now!
      </p>
      <v-btn to="/" class="mt-2" color="primary"> Go to Menu </v-btn>
    </v-col>

    <v-col
      v-if="!loading"
      class="px-0"
      v-for="order in sortedOrders"
      :key="order.id"
    >
      <v-card
        class="custom-radius bg-in-progress"
        :to="`/orderdetails/${order.id}`"
      >
        <v-row
          class="px-2 py-2 d-flex flex-row align-center justify-space-between"
        >
          <v-card-subtitle class="text-subtitle-1">
            {{ order.order_number }}
          </v-card-subtitle>
          <v-card-title class="text-primary text-body-2">
            {{ order.status_label }}
          </v-card-title>
        </v-row>

        <v-row
          v-for="item in order.cart.cart_items"
          :key="item.id"
          class="my-3 align-center"
        >
          <v-card class="image-holder ml-6 custom-radius">
            <v-img
              :src="item.product?.image"
              alt="Product Image"
              class="product-image"
              height="100%"
              width="100%"
              cover
            />
          </v-card>
          <v-card-title class="text-subtitle-1 pr-2 m">
            {{ item.product?.name }}
          </v-card-title>
          <v-card-subtitle class="px-0">
            X {{ item.quantity }}
          </v-card-subtitle>
          <v-card-title class="last-item mr-2 text-body-2">
            ₱ {{ item.price }}
          </v-card-title>
        </v-row>

        <v-row class="mt-3 mb-1 justify-end">
          <v-card-title class="text-body-2 mr-2">
            Total Amount: ₱ {{ order.cart.total }}
          </v-card-title>
        </v-row>

        <v-btn
          :to="`/orderdetails/${order.id}`"
          class="btn w-100"
          color="primary"
          >View Details</v-btn
        >
      </v-card>
    </v-col>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { getAuth } from "@/pages/auth/authServiceProvider/authService";

const orders = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { customer } = getAuth();
    const customerId = customer ? customer.id : null;
    const response = await axios.get(
      `/api/customers/${customerId}/orders/inactive`
    );
    orders.value = response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    loading.value = false;
  }
});

const sortedOrders = computed(() => {
  return orders.value.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
});
</script>

<style scoped>
.header-holder {
  justify-content: start;
  align-items: center;
}
.items {
  margin-right: 75px;
}
.button-text {
  font-size: 22px;
}
.image-holder {
  width: 50px;
  height: 50px;
}
.product-image {
  height: auto;
  object-fit: cover;
}
.last-item {
  margin-left: auto;
}
.btn {
  border-radius: 0 !important;
}
</style>
