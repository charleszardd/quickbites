import { ref } from 'vue';
import axios from 'axios';

export const useProducts = (category) => {
    const loading = ref(false);
    const error = ref(null);
    const products = ref([]); 
    const currentPage = ref(1);
    const totalPages = ref(1);
    const perPage = ref(5);
    const searchedProductId = ref(null); 
  
    const fetchProducts = async (page = 1) => {
      loading.value = true;
      console.log('Fetching products for category:', category.value, 'on page:', page);
  
      try {
        const response = await axios.get(
          `/api/products?page=${page}&per_page=${perPage.value}&category=${category.value}`
        );
  
        if (page === 1) {
          products.value = response.data.products;
        } else {
          products.value = [...products.value, ...response.data.products];
        }
  
        currentPage.value = response.data.current_page;
        totalPages.value = response.data.last_page;
  
        console.log('Fetched products:', products.value);
      } catch (err) {
        error.value = `Failed to fetch products for ${category.value}. Please try again.`;
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
  
    const setSearchedProduct = async (productId) => {
      searchedProductId.value = productId;
      const page = await findProductPage(productId);
  
      if (page !== -1) {
        await fetchProducts(page);
        prioritizeProduct(productId);
      }
    };
  
    const findProductPage = async (productId) => {
      // Look for the product in all pages
      for (let page = 1; page <= totalPages.value; page++) {
        await fetchProducts(page);
        const product = products.value.find(p => p.id === productId);
        if (product) {
          return page; // Found on this page
        }
        await fetchProducts(page);
      }
      console.error('Product not found across all pages');
      return -1; // If product not found
    };
  
    const prioritizeProduct = (productId) => {
      const foundProduct = products.value.find(p => p.id === productId);
      if (foundProduct) {
        products.value = [
          foundProduct,
          ...products.value.filter(p => p.id !== productId),
        ];
        console.log('Product prioritized:', foundProduct);
      }
    };
  
    return {
      loading,
      error,
      products,
      currentPage,
      totalPages,
      fetchProducts,
      setSearchedProduct,
      findProductPage,
    };
  };
  
