<template>
  <v-col>
    <v-row v-if="loading">
      <p>Loading products...</p>
    </v-row>
    <v-row v-if="error">
      <p>{{ error }}</p>
    </v-row>
    <v-row v-if="!loading && !error && filteredProducts.length === 0">
      <p>No products available.</p>
    </v-row>
    <v-row>
      <ProductTable :products="filteredProducts" :updateProduct="updateProduct" :deleteProduct="deleteProduct" />
    </v-row>
    <v-row v-if="filteredProducts.length > 0">
      <Pagination 
        :currentPage="currentPage"
        :totalPages="totalPages"
        :maxVisiblePages="10"
        @updatePage="fetchProducts"
        @nextPages="fetchNextPages"/>
    </v-row>
  </v-col>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';

// Props
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
});

// Reactive state
const loading = ref(true);
const error = ref(null);
const products = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const perPage = ref(5);

// Computed properties for filtering and prioritizing the products
const prioritizedProduct = computed(() => {
  return products.value.find(product => product.id === props.productId);
});

const filteredProducts = computed(() => {
  // Get the prioritized product (if any) and the other products
  const restProducts = products.value.filter(product => product.id !== props.productId);
  return prioritizedProduct.value ? [prioritizedProduct.value, ...restProducts] : restProducts;
});

// Fetch products from the API
const fetchProducts = async (page = 1) => {
  loading.value = true;
  try {
    const response = await axios.get(
      `/api/products?page=${page}&per_page=${perPage.value}&category=${props.category}`
    );
    products.value = response.data.products;
    currentPage.value = response.data.current_page;
    totalPages.value = response.data.last_page;
  } catch (err) {
    error.value = `Failed to fetch ${props.category}. Please try again.`;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Update product function
const updateProduct = async (product) => {
  try {
    await axios.put(`/api/products/${product.id}`, {
      name: product.name,
      stock_quantity: product.stock_quantity,
      price: product.price,
    });
    window.$snackbar('Product updated successfully', 'success');
    product.isEditing = false;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred while updating the product.';
    window.$snackbar(errorMessage, 'error');
  }
};

// Delete product function
const deleteProduct = async (productId) => {
  try {
    await axios.delete(`/api/products/${productId}`);
    window.$snackbar('Product deleted successfully', 'success');
    products.value = products.value.filter(product => product.id !== productId);
  } catch (error) {
    window.$snackbar(error.response?.data?.message || 'An error occurred while deleting the product.', 'error');
  }
};

// Handle pagination updates
const onUpdatePage = (page) => {
  currentPage.value = page;
  fetchProducts(page);
};

const onNextPage = () => {
  if (currentPage.value < totalPages.value) {
    onUpdatePage(currentPage.value + 1);
  }
};

// Watch for changes in products to log
watch(products, (newProducts) => {
  console.log('Updated products:', newProducts);
});

// Initial fetch on mounted
onMounted(() => {
  fetchProducts();
});
</script>

<style></style>
