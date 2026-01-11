import { messaging } from '../firebase';
import { getToken, onMessage } from 'firebase/messaging';

// Request permission and get token
export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'your-vapid-key' }); // Replace with your VAPID key
      return token;
    }
  } catch (error) {
    console.error('Error getting permission:', error);
  }
};

// Listen for messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });