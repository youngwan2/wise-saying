
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIRE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIRE_MEASUREMENT_ID
  };
  
  console.log(process.env.NEXT_PUBLIC_FIRE_STORAGE_BUCKET)
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);