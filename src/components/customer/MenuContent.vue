<template>
  <v-container fluid>
    <v-col>
      <SearchBar />
    
    </v-col>
    <v-row class="category-container my-3">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-wrapper" 
      >
        <v-card
          :class="['category-card custom-radius', { active: category.id === activeCategory }]"
          @click="setActiveCategory(category.id)"
        >
          <v-img
            :src="category.image"
            alt="Category Image"
            class="category-image"
          />

          <v-card-title class="category-text-inside" v-if="category.id === activeCategory">
            {{ category.name }}
          </v-card-title>
        </v-card>

        <div v-if="category.id !== activeCategory" class="category-text">
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
  activeCategory.value = categoryId;
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
}

.category-card {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: width 0.3s ease, height 0.3s ease; 
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
  width: 80px; 
  height: auto; 
  justify-content: center; 
  align-items: center; 
}

.category-text-inside {
  font-size: 10px;
  
}


</style>
