import { ref } from 'vue';

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : { products: [], count: 0 };
};

const cartData = loadCartFromLocalStorage();
const products = ref(cartData.products);
const count = ref(cartData.count);

const addProduct = (product) => {
  const existingProduct = products.value.find((p) => p.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity++; 
  } else {
    product.quantity = 1; 
    products.value.push(product);
  }
  
  count.value++;
  saveCartToLocalStorage(); 
};

const incrementQuantity = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  if (product) {
    product.quantity++;
    count.value++;
    saveCartToLocalStorage();
  }
};

const decrementQuantity = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  if (product && product.quantity > 1) {
    product.quantity--;
    count.value--;
    saveCartToLocalStorage();
  } else if (product && product.quantity === 1) {
    removeProduct(productId); 
  }
};

const removeProduct = (productId) => {
  const productIndex = products.value.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    count.value -= products.value[productIndex].quantity;
    products.value.splice(productIndex, 1);
    saveCartToLocalStorage(); 
  }
};

const clearCart = () => {
  products.value.splice(0); 
  count.value = 0;
  localStorage.removeItem('cart'); 
};

const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify({ products: products.value, count: count.value }));
};

const getProductCount = () => count.value;

export const cart = {
  products,
  count,
  addProduct,
  removeProduct,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  getProductCount,
};
