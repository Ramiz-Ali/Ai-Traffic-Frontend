import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import the Auth module

const firebaseConfig = {
  apiKey: "AIzaSyCzXztsToLRe7cNKci9Kwzp0m-zGm0ptLw",
  authDomain: "ai-traffic-57d12.firebaseapp.com",
  projectId: "ai-traffic-57d12",
  storageBucket: "ai-traffic-57d12.firebasestorage.app",
  messagingSenderId: "640510626870",
  appId: "1:640510626870:web:d786a895f3d1c400895c97",
  measurementId: "G-7QGGM57XFV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

export { auth };