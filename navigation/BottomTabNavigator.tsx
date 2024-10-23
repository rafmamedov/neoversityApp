import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons'

import MapScreen from "../screens/MapScreen";
import CameraScreen from "../screens/CameraScreen";
import BackButton from "../components/BackButton";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        tabBarLabel: "",
        headerLeft: () => (
          <BackButton
            onPress={() => navigation.goBack()}
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
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
