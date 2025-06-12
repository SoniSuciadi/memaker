import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import SelectTemplateScreen from '../screens/select-template';
import CanvasScreen from '../screens/canvas';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="select-template"
          component={SelectTemplateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="canvas"
          component={CanvasScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
