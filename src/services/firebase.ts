import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  apiKey: 'AIzaSyDoy0IPYYdsrBDDkTg2BU0AzcKpq4VQdRI',
  authDomain: 'scrum-flush.firebaseapp.com',
  databaseURL: 'https://scrum-flush-default-rtdb.firebaseio.com',
  projectId: 'scrum-flush',
  storageBucket: 'scrum-flush.appspot.com',
  messagingSenderId: '459875818179',
  appId: '1:459875818179:web:8d47d6d3a1895620836076',
  measurementId: 'G-KVMKBNHHW3',
}

console.log(firebaseConfig)

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
