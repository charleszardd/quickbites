<template>
    <v-col class="mx-0 px-1">
        <h3 class="mb-2">All</h3>

        <v-row v-if="hasProducts">
            <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
                <v-card class="custom-radius product-card py-2" height="70"
                    :class="{ disabled: product.status_id === 2 }">
                    <v-card class="custom-radius product-image-holder">
                        <v-img :src="product.image" alt="Product Image" class="product-image" height="100%" width="100%"
                            cover />
                    </v-card>

                    <v-col class="pa-0">
                        <v-card-title class="text-subtitle-1 py-0">{{ product.name }}</v-card-title>
                        <v-card-subtitle class="text-subtitle-2 py-0">{{ "₱" + product.price.toFixed(2)
                            }}</v-card-subtitle>
                        <v-card-subtitle class="text-subtitle-2 py-0">
                            <small>{{ statusMapping[product.status_id] }}</small>
                        </v-card-subtitle>
                    </v-col>

                    <v-btn @click.prevent="addToCart(product)" color="primary add-button" size="" height="100">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-else>
            <v-col>
                <p>No products available.</p>
            </v-col>
        </v-row>
    </v-col>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import axios from "axios";
import { cart } from "@/stores/cart";

// Data binding
const products = ref([]);
const loading = ref(false);
const page = ref(1);
const hasMoreProducts = ref(true);

const statusMapping = {
    1: "Available",
    2: "Sold Out",
};

const fetchProducts = async () => {
    if (loading.value || !hasMoreProducts.value) return;

    loading.value = true;
    try {
        const response = await axios.get(`/api/products/all?page=${page.value}`);
        const newProducts = response.data.data;

        if (newProducts.length === 0) {
            hasMoreProducts.value = false;
        } else {
            products.value.push(...newProducts);
            page.value += 1;
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
    } finally {
        loading.value = false;
    }
};

const handleScroll = () => {
    const bottom = document.documentElement.scrollHeight === window.innerHeight + window.scrollY;
    if (bottom && !loading.value && hasMoreProducts.value) {
        fetchProducts();
    }
};

onMounted(() => {
    fetchProducts();
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});

const hasProducts = computed(() => {
    return products.value.length > 0;
});

// Add a product to the cart
const addToCart = (product) => {
    cart.addProduct(product);
};
</script>

<style scoped>
.product-card {
    transition: 0.3s ease;
    display: flex;
    align-items: center;
    flex: 1;
}

.product-card.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
}

.product-image-holder {
    width: 100px;
    height: 100px;
}

.product-image {
    width: 100%;
    height: auto;
}

.add-button {
    width: 40px !important;
}
</style>
