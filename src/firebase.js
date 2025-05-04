import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCB1biMjhHpfn64_nhZbUWnF6QVuH3envE",
    authDomain: "ai-traffic-management-63603.firebaseapp.com",
    projectId: "ai-traffic-management-63603",
    storageBucket: "ai-traffic-management-63603.firebasestorage.app",
    messagingSenderId: "985862962126",
    appId: "1:985862962126:web:c8731e254b0d09d23f499f",
    measurementId: "G-4DJFJFBYP1"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };