<template>
  <v-col v-if="isUserAuthenticated">
    <v-navigation-drawer
      :model-value="isDrawerOpen"
      app
      temporary
      @update:model-value="updateDrawer"
    >
      <v-row align="center" class="mx-auto drawer-header px-3 py-2">
        <v-avatar size="40">
          <img :src="userAvatar" alt="User Avatar" />
        </v-avatar>
        <v-col class="ml-3">
          <div class="text-h6">{{ customerName  || 'P. Diddy' }}</div>
          <div class="profile-text ml-0 mt-1 text-body-2" color="primary">
            <router-link to="/profile"></router-link>
            Manage Profile
          </div>
        </v-col>
      </v-row>

      <v-list class="item-text" density="compact">
        <v-list-item
          :class="{ 'active-item': isActive('/') }"
          title="Menu"
          to="/"
        ></v-list-item>
        <v-divider />
        <v-list-item
          :class="{ 'active-item': isActive('/orders') }"
          title="Orders"
          to="/orders"
        ></v-list-item>
        <v-divider />
        <v-list-item
          :class="{ 'active-item': isActive('/wallet') }"
          title="Wallet"
          to="/wallet"
        ></v-list-item>
        <v-divider />
        <v-list-item
          :class="{ 'active-item': isActive('/aboutUs') }"
          title="About Us"
          to="/aboutUs"
        ></v-list-item>
        <v-divider />
        <v-list-item
          :class="{ 'active-item': isActive('/auth/login') }"
          title="Sign Out"
          @click="handleLogout"
          to="/auth/login"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-col>

  <v-col v-else>
    <v-navigation-drawer
      :model-value="isDrawerOpen"
      app
      temporary
      @update:model-value="updateDrawer"
    >
      <v-row align="center" class="drawer-header mt-1"></v-row>

      <v-list density="compact">
        <v-list-item
          :class="{ 'active-item': isActive('/') }"
          title="Menu"
          to="/menu"
        ></v-list-item>
        <v-divider />
        <v-list-item
          :class="{ 'active-item': isActive('/aboutUs') }"
          title="About Us"
          to="/aboutUs"
        ></v-list-item>
        <v-divider />
        <v-list-item
          :class="{ 'active-item': isActive('/auth/register') }"
          title="Sign Up"
          to="/auth/register"
        ></v-list-item>
        <v-divider />
        <v-list-item
          :class="{ 'active-item': isActive('/auth/login') }"
          title="Log In"
          to="/auth/login"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-col>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { logout, getAuth } from "@/pages/auth/authServiceProvider/authService";
import axios from 'axios';


const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits();

const updateDrawer = (value) => {
  emit("update:isDrawerOpen", value);
};

const route = useRoute();
const isActive = (path) => {
  return route.path === path;
};

const isUserAuthenticated = ref(!!localStorage.getItem("token"));
const customerName = ref('');

const handleLogout = async () => {
  logout();
  isUserAuthenticated.value = false;
};

onMounted(async() => {
    const { token } = getAuth();
    try{
        const response = await axios.get('/api/get-customer-name', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        customerName.value = `${response.data.first_name} ${response.data.last_name}`;
    } catch(error){
        console.error(`Error fetching customer name:`, error);
    }
});
</script>

<style scoped>
.profile-text {
  font-style: italic;
}
.profile-text:hover {
  cursor: pointer;
  text-decoration: underline;
}
.active-item {
  background-color: #171826;
  color: white;
}
.item-text {
  font-size: 50px;
}
</style>
