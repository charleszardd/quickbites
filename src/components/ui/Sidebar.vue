<template>
  <v-col v-if="isUserAuthenticated">
    <v-navigation-drawer
      :model-value="isDrawerOpen"
      app
      temporary
      @update:model-value="updateDrawer"
    >
      <v-row align="center" class="drawer-header"></v-row>

      <v-divider></v-divider>

      <v-list class="item-text" density="compact">
        <v-list-item
          :class="{'active-item': isActive('/menu')}"
          title="Menu"
          to="/menu"
        ></v-list-item>
        <v-divider  /> 
        <v-list-item
          :class="{'active-item': isActive('/orders')}"
          title="Orders"
          to="/orders"
        ></v-list-item>
        <v-divider  /> 
        <v-list-item
          :class="{'active-item': isActive('/wallet')}"
          title="Wallet"
          to="/wallet"
        ></v-list-item>
        <v-divider  /> 
        <v-list-item
          :class="{'active-item': isActive('/aboutUs')}"
          title="About Us"
          to="/aboutUs"
        ></v-list-item>
        <v-divider  /> 
        <v-list-item
          :class="{'active-item': isActive('/login')}"
          title="Sign Out"
          to="/login"
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
      <v-row align="center" class="mx-auto drawer-header px-3 py-2">
        <v-avatar size="40">
          <img :src="userAvatar" alt="User Avatar" />
        </v-avatar>
        <v-col class="ml-3">
          <div class="text-h6">{{ userName || 'John Doe' }}</div>
          <div
            class="profile-text ml-0 mt-1 text-body-2"
            color="primary"
            to="/profile"
          >
            Manage Profile
          </div>
        </v-col>
      </v-row>

   

      <v-list density="compact" >
        <v-list-item
          :class="{'active-item': isActive('/menu')}"
          title="Menu"
            to="/menu"
        ></v-list-item>
        <v-divider  /> 
        <v-list-item
          :class="{'active-item': isActive('/aboutUs')}"
          title="About Us"
          to="/aboutUs"
        ></v-list-item>
        <v-divider  /> 
        <v-list-item
          :class="{'active-item': isActive('/register')}"
          title="Sign Up"
            to="/register"
        ></v-list-item>
        <v-divider  /> 
        <v-list-item
          :class="{'active-item': isActive('/login')}"
          title="Log In"
            to="/login"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-col>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits();

const updateDrawer = (value) => {
  emit('update:isDrawerOpen', value);
};


const route = useRoute();
const isActive = (path) => {
  return route.path === path;
};
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
.item-text{
    font-size: 50px;
}
</style>
