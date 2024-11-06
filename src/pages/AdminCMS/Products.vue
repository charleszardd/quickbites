<template>
  <div>
    <v-card>
      <v-layout>
        <v-main>
          <v-app class="px-5 py-5">
            <v-col>
              <v-col>
                <h1 class="page-title">Products</h1>
              </v-col>

              <v-col>
                <v-row>
                  <v-card class="custom-radius d-flex align-center justify-center">
                    <v-tabs v-model="tab" color="primary">
                      <v-tab class="custom-radius my-auto" value="meals">Meals</v-tab>
                      <v-tab class="custom-radius my-auto" value="snacks">Snacks</v-tab>
                      <v-tab class="custom-radius my-auto" value="chips">Chips</v-tab>
                      <v-tab class="custom-radius my-auto" value="candies">Candies</v-tab>
                      <v-tab class="custom-radius my-auto" value="drinks">Drinks</v-tab>
                      <v-tab class="custom-radius my-auto" value="supplies">Supplies</v-tab>
                    </v-tabs>
                  </v-card>
                  <v-spacer class="custom-spacer"></v-spacer>
                  <v-row class="align-center">
                    <SearchBar
                      @select-product="navigateToCategory"
                      :height="5"
                      class="custom-height mr-10"
                    />
                    <AddNewProduct />
                  </v-row>
                </v-row>
              </v-col>

              <v-card-text>
                <v-tabs-items v-model="tab">
                  <v-tab-item v-for="category in ['meals', 'snacks', 'chips', 'candies', 'drinks', 'supplies']" :key="category" :value="category">
                    <ProductCategory
                      v-if="tab === category"
                      :products="filteredProducts"
                      :category="category"
                      :productId="searchedProductId"
                      :key="category"
                    />
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
            </v-col>
          </v-app>
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import ProductCategory from "@/components/admin/ProductsComponents/ProductCategory.vue";
import { useProducts } from "@/composables/useProducts";

const tab = ref("meals");
const searchedProductId = ref(null); 

const { fetchProducts, products, currentPage, totalPages, setSearchedProduct } = useProducts(tab);

onMounted(() => {
  fetchProducts(1);
});

watch(tab, (newCategory) => {
  fetchProducts(1); 
});

const categoryMap = {
  1: "meals",
  2: "snacks",
  3: "chips",
  4: "candies",
  5: "drinks",
  6: "supplies",
};

const navigateToCategory = async (categoryId, productId) => {
  console.log("Navigating to category:", categoryId, "with productId:", productId);

  const categoryName = categoryMap[categoryId];

  if (!categoryName) {
    console.error("Invalid category ID:", categoryId);
    return;
  }

  tab.value = categoryName; 
  searchedProductId.value = productId; 
  setSearchedProduct(productId);
};

const filteredProducts = computed(() => {
  
  return products.value.filter(product => product.category === tab.value);
});

const loadMoreProducts = async () => {
  if (currentPage.value < totalPages.value) {
    const nextPage = currentPage.value + 1;
    await fetchProducts(nextPage);  
  }
};
</script>

<style scoped>
.custom-spacer {
  width: 0 !important;
}
.custom-height {
  height: 20px !important;
}
</style>
