<template>
  <v-container fluid>
    <v-col>
      <SearchBar />

    </v-col>
    <v-row class="category-container my-3">
      <div v-for="category in categories" :key="category.id" class="category-wrapper"
        :class="{ active: category.id === activeCategory }">
        <v-card :class="['category-card custom-radius', { active: category.id === activeCategory }]"
          @click="setActiveCategory(category.id)" color="transparent" flat>
          <v-img :src="category.image" alt="Category Image" class="category-image" />

        </v-card>

        <div class="category-text">
          {{ category.name }}
        </div>
      </div>
    </v-row>

  </v-container>

</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const categories = ref([]);
const activeCategory = ref(null);

const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const setActiveCategory = (categoryId) => {
  activeCategory.value = activeCategory.value === categoryId ? null : categoryId;
};

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