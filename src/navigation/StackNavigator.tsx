import { createStackNavigator } from "@react-navigation/stack"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const Stack = createStackNavigator();

export type StackParamList = {
  Home: undefined;         // Якщо екран не приймає параметрів
  Login: undefined;
  Signup: undefined; // Якщо екран приймає параметри
};

const StackNavigator = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        // Якщо користувач залогінений, показуємо головний екран
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      ) : (
        // Якщо користувач не залогінений, показуємо екрани Login та Signup
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;