import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDMyI8oV-bqiCxzKyAF4QzIQ7EyRGfuhWM',
  authDomain: 'bookingapp-b164c.firebaseapp.com',
  projectId: 'bookingapp-b164c',
  storageBucket: 'bookingapp-b164c.appspot.com', 
  messagingSenderId: '886372211367',
  appId: '1:886372211367:web:e3090c9a510de8305c9982',
  measurementId: 'G-JFQNL5JED4',
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
