import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';

import { colors } from "../../styles/global";

import { RootState } from "../redux/store/store";
import Input from "../components/Input";
import { getImageUrl, updateUserInFirestore, uploadImage } from "../utils/firestore";
import { setUserInfo } from "../redux/reducers/userSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [userName, setUserName] = useState<string>(userInfo?.displayName || '')

   // Завантаження зображення та отримання URL
   const handleImageUpload = async (
    userId: string,
    file: File | Blob,
    fileName: string,
  ) => {
    try {
      console.log('FILE', file)
      // Завантажуємо зображення
      const imageRef = await uploadImage(userId, file, fileName);

      // // Отримуємо URL завантаженого зображення
      const imageUrl = await getImageUrl(imageRef);
      
      console.log('Image URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image and getting URL:', error);
    }
  };

  // Функція для вибору зображення з медіатеки та завантаження
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled && userInfo) {
      const uri = result.assets[0].uri;
  
      const response = await fetch(uri);
      const file = await response.blob();
  
      // // Перетворюємо Blob на File, якщо це необхідно
      const fileName = uri.split('/').pop() || "123"; // Отримуємо ім'я файлу з URI
      const fileType = file.type; // Отримуємо тип файлу

      console.log('FILE NAME', fileName)
  
      const imageFile = new File([file], fileName, { type: fileType });
  
      // Завантажуємо зображення
      const imageUrl = await handleImageUpload(userInfo.uid, imageFile, fileName);

      await updateUserInFirestore(userInfo.uid, { profilePhoto: imageUrl })

      dispatch(setUserInfo({
        ...userInfo,
        profilePhoto: imageUrl,
      }));
    }
  };

  const onUserNameChange = async () => {
    if (!userInfo) return;

    try {
      await updateUserInFirestore(userInfo?.uid, {
        displayName: userName,
      });

      dispatch(setUserInfo({ ...userInfo, displayName: userName }))
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={styles.section}>
    {/* Відображення вибраного зображення, якщо воно є */}
    {userInfo?.profilePhoto ? (
      <Image source={{ uri: userInfo?.profilePhoto }} style={styles.image} />
    ) : (
      <Ionicons name="person-circle-outline" size={100} color={colors.black_primary} />
    )}

    <View style={styles.infoContainer}>
      <Text style={styles.title}>Name:</Text>
      <Text>{userInfo?.displayName || 'Anonim'}</Text>
    </View>

    <Input
      value={userName}
      onBlur={onUserNameChange}
      outerStyles={{ width: "60%" }}
      onTextChange={setUserName}
    />

    <View style={styles.infoContainer}>
      <Text style={styles.title}>Email:</Text>
      <Text>{userInfo?.email || 'Anonim'}</Text>
    </View>

    {/* Кнопка камери */}
    <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
      <Ionicons size={32} name="camera" color={colors.orange} />
    </TouchableOpacity>
  </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  infoContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black_primary,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  cameraButton: {
    marginTop: 20,
  },
});
