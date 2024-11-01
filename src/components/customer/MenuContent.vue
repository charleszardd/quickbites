<template>
  <div>
    <v-container fluid>
      <v-col>
        <SearchBar @select-product="navigateToCategory" />
      </v-col>
      <v-row class="category-container my-3">
        <div
          v-for="category in categories"
          :key="category.id"
          class="category-wrapper"
          :class="{ active: category.id === activeCategory }"
        >
          <v-card
            :class="[
              'category-card custom-radius',
              { active: category.id === activeCategory },
            ]"
            @click="setActiveCategory(category.id)"
            color="transparent"
            flat
          >
            <v-img
              :src="category.image"
              alt="Category Image"
              class="category-image"
            />
          </v-card>

          <div class="category-text">
            {{ category.name }}
          </div>
        </div>
      </v-row>
    </v-container>
    <CategoryContent
      :categoryId="activeCategory"
      v-if="activeCategory"
      :categories="categories"
      :highlightedProductId="searchedProductId"
      :searchedProductId="searchedProductId"
    />
    <AllProducts v-else />
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const categories = ref([]);
const activeCategory = ref(null);
const highlightedProductId = ref(null);
const searchedProductId = ref(null);

const onSearch = (productId) => {
  searchedProductId.value = productId;
  activeCategory.value = null;
};

const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const setActiveCategory = (categoryId) => {
  activeCategory.value =
    activeCategory.value === categoryId ? null : categoryId;
};


const navigateToCategory = (categoryId, searchedProductId) => {
  activeCategory.value = categoryId;


  if (searchedProductId) {
    props.searchedProductId = searchedProductId;
  }
};

const sortedProducts = computed(() => {
  const highlightedProduct = products.value.find(product => product.id === props.highlightedProductId);
  const searchedProduct = products.value.find(product => product.id === props.searchedProductId);

  const otherProducts = products.value.filter(product => 
    product.id !== props.highlightedProductId && product.id !== props.searchedProductId
  );

  const sortedArray = [];

  if (searchedProduct) {
    sortedArray.push(searchedProduct);
  }

  if (highlightedProduct && highlightedProduct.id !== searchedProduct?.id) {
    sortedArray.push(highlightedProduct);
  }

  return [...sortedArray, ...otherProducts];
});

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.category-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.category-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.3s ease;
}

.category-card {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.category-image {
  width: 100%;
  height: auto;
}

.category-text {
  font-size: 10px;
  text-align: center;
  margin-top: 5px;
}

.category-card.active {
  transform: rotate(20deg);
}

.category-wrapper.active {
  background-color: #ccc !important;
  border-radius: 15px;
}
</style>