import { createStackNavigator } from "@react-navigation/stack"
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export type StackParamList = {
  Home: undefined;         // Якщо екран не приймає параметрів
  Login: undefined;
  Signup: { userEmail: string }; // Якщо екран приймає параметри
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "",
        }}
      />

      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;