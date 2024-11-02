import { FC, useState } from "react";
import {Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "../navigation/StackNavigator";
import Input from "../components/Input";
import Button from "../components/Button";
import { colors } from "../../styles/global";
import { loginDB } from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

// Типізуємо параметри для HomeScreen
type HomeScreenProps = NativeStackScreenProps<StackParamList, 'Login'>;

const LoginScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const dispatch = useDispatch();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const showPassword = () => {
    setIsPasswordVisible(prev => !prev)
  };

  const onLogin = async () => {
    console.log('onLogin')
    try {
      await loginDB({ email, password }, dispatch)
      // Логіка для переходу на інший екран або відображення повідомлення про успіх
    } catch (err) {
      console.error('Login error:', err); // Логування помилок
    }
  };

  const onSignUp = () => {
    navigation.navigate('Signup')
  };
  
  const showButton = (
    <TouchableOpacity
      onPress={showPassword}
    >
      <Text style={[styles.baseText, styles.passwordButtonText]}>
        Показати
      </Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <>
        <Image
          source={require("../../assets/images/background.png")}
          resizeMode="cover"
          style={styles.image}
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? 'padding' : 'height'}
        >
          <View
            style={styles.formContainer}
          >
            <Text style={styles.title}>Увійти</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={handleEmailChange}
              />

              <Input
                value={password}
                placeholder="Пароль"
                rightButton={showButton}
                outerStyles={styles.passwordButton}
                onTextChange={handlePasswordChange}
                secureTextEntry={isPasswordVisible}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onLogin}>
                <Text style={[styles.baseText, styles.loginButtonText]}>
                  Увійти
                </Text>
              </Button>

              <View style={styles.signUpContainer}>
                <Text style={[styles.baseText, styles.passwordButtonText]}>
                  Немає акаунту?
                  <TouchableWithoutFeedback onPress={onSignUp}>
                    <Text style={styles.signUpText}> Зареєструватися</Text>
                  </TouchableWithoutFeedback>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%"
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "55%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    textDecorationLine: "underline",
  }
});
