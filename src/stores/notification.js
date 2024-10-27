import { defineStore } from 'pinia';
import axios from 'axios';
import { getAuth } from '@/pages/auth/authServiceProvider/authService'; // Adjust import as necessary

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),
  getters: {
    getUnreadNotificationCount(state) {
      return state.notifications.filter(notification => !notification.is_read).length;
    },
    getNotifications(state) {
      return state.notifications;
    },
  },
  actions: {
    async fetchNotifications(customerId) {
      const { token } = getAuth(); // Assuming getAuth returns an object with a token property
      try {
        const response = await axios.get(`/api/notifications?customer_id=${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.notifications = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    addNotification(notification) {
      this.notifications.push(notification);
    },
    async markAsRead(notificationId) {
      const notification = this.notifications.find(n => n.id === notificationId);
      if (notification) {
        try {
          const { token } = getAuth(); // Get the token for authorization
          await axios.put(`/api/notifications/${notificationId}`, {
            is_read: true,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Update the local state to reflect the change
          notification.is_read = true;
        } catch (error) {
          console.error('Error marking notification as read:', error);
        }
      }
    },
    async markAllAsRead() {
      const { customer } = getAuth(); // Ensure this is imported correctly if used
      if (customer) {
        const notifications = this.getNotifications; // Access as a property
        await Promise.all(
          notifications.map(async (notif) => {
            if (!notif.is_read) {
              await this.markAsRead(notif.id); // Call the action within the store
            }
          })
        );
      }
    },
  },
});
