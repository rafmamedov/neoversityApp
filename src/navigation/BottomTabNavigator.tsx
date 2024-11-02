import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons'

import MapScreen from "../screens/MapScreen";
import CameraScreen from "../screens/CameraScreen";
import BackButton from "../components/BackButton";
import ProfileScreen from "../screens/ProfileScreen";
import { logoutDB } from "../utils/auth";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        tabBarLabel: "",
        headerLeft: () => (
          <BackButton
            onPress={() => logoutDB(dispatch)}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Map",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={32}
              name="map"
              color={focused ? "red" : "black"}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={({ navigation }) => ({
          title: "Camera",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="camera"
              size={32}
              color={focused ? "red" : "black"}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={32}
              color={focused ? "red" : "black"}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
