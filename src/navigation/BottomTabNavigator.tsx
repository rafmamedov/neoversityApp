import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import Ionicons from '@expo/vector-icons/Ionicons'

import { colors } from "../../styles/global";

import CameraScreen from "../screens/CameraScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostNavigator from "./CreatePostNavigator";
import BackButton from "../components/BackButton";
import { logoutDB } from "../utils/auth";
import MapScreen from "../screens/MapScreen";
import LogoutButton from "../components/LogoutButton";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        tabBarLabel: "",
        tabBarStyle: {
          height: 100,
          paddingVertical: 16,
        },
      })}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: "Map",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="map"
              size={32}
              color={focused ? colors.orange : "black"}
            />
          ),
        })}
      />

      <Tab.Screen
        name="CreatePostStack"
        component={CreatePostNavigator}
        options={({ navigation }) => ({
          title: "Create Post",
          headerShown: false,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <BackButton
              onPress={() => navigation.goBack()}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <View style={styles.addButton}>
              <Ionicons
                size={32}
                name="add"
                color={colors.white}
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          headerRight: () => (
            <LogoutButton
              onPress={() => logoutDB(dispatch)}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={32}
              color={focused ? colors.orange : "black"}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTabNavigator;
