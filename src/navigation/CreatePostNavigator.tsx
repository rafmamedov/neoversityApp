import { createStackNavigator } from "@react-navigation/stack"

import CameraScreen from "../screens/CameraScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import BackButton from "../components/BackButton";

const Stack = createStackNavigator();

export type CreatePostStackParamList = {
  Camera: undefined;
  CreatePost: { photo?: string };
};

const CreatePostNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName="CreatePost"
      screenOptions={({ navigation }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerLeft: () => (
          <BackButton
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default CreatePostNavigator;