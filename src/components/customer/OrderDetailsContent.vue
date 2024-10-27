<template>
  <div class="py-0 mt-0 pt-0">
    <v-row class="header-holder mt-1 mb-3">
      <v-btn
        to="/orders"
        size="small"
        class="items button-text"
        variant="text"
        color="black"
      >
        <v-icon class="justify-start">mdi-arrow-left</v-icon>
      </v-btn>
      <h2 class="items">Order Details</h2>
    </v-row>

    <v-col
      v-if="condition"
      class="justify-center text-center align-center px-0"
    >
      <v-img :src="imageAndSubtitle(order?.status_label).image"></v-img>
      <h5>{{ imageAndSubtitle(order?.status_label).subtitle }}</h5>
    </v-col>

    <v-col class="px-0" v-if="order">
      <v-card class="custom-radius my-5 justify-space-between">
        <v-card
          color="primary"
          height="auto"
          class="btn pl-2 text-body-1 w-100 align-center"
          >{{ statusMessage(order.status_label) }}</v-card
        >

        <v-row
          v-for="(item, index) in order.cart.cart_items"
          :key="index"
          class="d-flex align-center"
        >
          <v-col class="px-0">
            <v-card class="item-holder custom-radius">
              <v-img
                :src="item.product?.image"
                alt="Product Image"
                class="product-image"
                height="100%"
                width="100%"
                cover
              />
            </v-card>
            <v-card-title class="text-body-1">
              {{ item.product?.name }}
            </v-card-title>
          </v-col>
          <v-col class="text-body-1 px-0"> X {{ item.quantity }} </v-col>
          <v-col class="last-item px-0 text-body-1"> ₱ {{ item.price }} </v-col>
        </v-row>

        <v-row class="justify-space-between mt-3">
          <v-col class="px-0text-body-1"> Total </v-col>
          <v-col class="px-0 text-body-1"> ₱ {{ order.cart.total }} </v-col>
        </v-row>
      </v-card>

      <v-card class="custom-radius d-flex mt-3">
        <v-row class="justify-space-between">
          <v-card-title class="text-body-1"> Order Status </v-card-title>
          <v-card-title>
            {{ order.status_label }}
          </v-card-title>
        </v-row>
        <v-row>
          <v-card-title class="text-body-1"> Paid by: </v-card-title>
          <v-card-title class="text-body-1">
            {{ paymentMapping[order.cart?.payment_id] }}
          </v-card-title>
        </v-row>
        <v-row>
          <v-card-title class="text-body-1"> Order Time: </v-card-title>
          <v-card-title class="text-body-1">
            {{ formatDate(order.created_at) }}
          </v-card-title>
        </v-row>
      </v-card>
    </v-col>
    <v-col v-else>
        <h3> Loading order details... </h3>
    </v-col>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { getAuth } from "@/pages/auth/authServiceProvider/authService";

const route = useRoute();
const order = ref(null);

const paymentMapping = {
  1: "Wallet",
  2: "Cash",
};

const getOrderDetails = async () => {
  try {
    const { customer } = getAuth();
    const customerId = customer ? customer.id : null;

    const response = await axios.get(
      `/api/customers/${customerId}/orders/inactive`
    );

    order.value = response.data.find((o) => o.id === parseInt(route.params.id));
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};

onMounted(() => {
  getOrderDetails();
});

const statusMessage = (status) => {
  switch (status) {
    case "In progress":
      return "Your order is currently being prepared";
    case "Pending":
      return "Your order is pending confirmation";
    case "Ready for pick-up":
      return "Your order is ready for pick up";
    default:
      return "Status unknown";
  }
};

const condition = computed(() => order.value && order.value.status_label);

const imageAndSubtitle = (status) => {
  switch (status) {
    case "Pending":
      return {
        image: "pic1",
        subtitle: "Your order is being processed. Please wait a moment.",
      };
    case "In Progress":
      return {
        image: "pc2",
        subtitle: "Your order is currently being prepared.",
      };
    case "Ready for Pick up":
      return {
        image: "pic3",
        subtitle: "Your order is ready for pick up.",
      };
    default:
      return {
        image: "path/to/default-image.png",
        subtitle: "Status unknown. Please check back later.",
      };
  }
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .replace(",", "");
};
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
.product-image {
  height: auto;
  object-fit: cover;
}
.btn {
  border-radius: 0 !important;
}
.last-item {
  margin-left: auto;
}
</style>
