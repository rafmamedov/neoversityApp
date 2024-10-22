import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons'

import LoginScreen from "../screens/LoginScreen";
import LogoutIcon from "../icons/LogoutIcon";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";
import SignupScreen from "../screens/SignupScreen";
import MainScreen from "../screens/MainScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        tabBarLabel: "",
        // headerShown: false,
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          title: "Main",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={32}
              name="heart-circle"
              color={focused ? "red" : "black"}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={({ navigation }) => ({
          title: "Увійти",
          headerLeft: () => <BackButton />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="log-in"
              size={32}
              color={focused ? "red" : "black"}
            />
          ),
          tabBarHideOnKeyboard: true,
        })}
      />

      <Tab.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "Реєстрація",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-circle"
              size={32}
              color={focused ? "red" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;








// export type RootTabParamList = {
//   Home: undefined;         // Якщо екран не приймає параметрів
//   Settings: { userId: string }; // Якщо екран приймає параметри
// };

// Типізуємо параметри для HomeScreen
// type HomeScreenProps = NativeStackScreenProps<RootTabParamList, 'Home'>;
