// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCBUxx7dYFBILgDAHTgE__81nToYfXYFz8', // з GoogleCloud API
  authDomain: 'neoversityapp.firebaseapp.com',
  databaseURL: '<https://neoversityapp.firebaseio.com>',
  projectId: 'neoversityapp',
  storageBucket: 'neoversityapp.appspot.com',
  appId: '1:860888754710:ios:311d9684baea8a17e56337',
  messagingSenderId: '860888754710',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

// Ініціалізація Auth з AsyncStorage для роботи редакс персистора
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
