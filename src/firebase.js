import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAnc184AoqIsozOEhyeT5bA2Y7gWTZhrig",
    authDomain: "test-db-84827.firebaseapp.com",
    projectId: "test-db-84827",
    storageBucket: "test-db-84827.appspot.com",
    messagingSenderId: "139979415778",
    appId: "1:139979415778:web:e2dc7de86785f0047cfebb"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export const db = getFirestore();

  export const storage = getStorage(app)