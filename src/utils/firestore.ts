import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../config';
import { UserData } from '../types';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Функція для додавання документа до колекції
export const addUser = async (userId: string, userData: UserData) => {
  try {
    await setDoc(doc(db, 'users', userId), userData, { merge: true });
    console.log('User added:', userId);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Функція для отримання документа з колекції
export const getUser = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('User data:', docSnap.data());
    return docSnap.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

// Функція для запису даних користувача у Firestore
export const updateUserInFirestore = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true }); // merge: true - для оновлення існуючого документа або створення нового
    console.log('User data updated to Firestore:', uid);
  } catch (error) {
    console.error('Error saving user data to Firestore:', error);
  }
};

// Функція для завантаження зображення
export const uploadImage = async (userId: string, file: Blob, fileName: string) => {
  try {
    const imageRef = ref(storage, `profilePhotos/${userId}/${fileName}`);

    console.log('Uploading to:', imageRef.fullPath);
    const result = await uploadBytes(imageRef, file);
    console.log('Upload result:', result);
    return imageRef;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


// Функція для отримання URL завантаженого зображення
export const getImageUrl = async (imageRef: any) => {
  const url = await getDownloadURL(imageRef);
  return url;
};
