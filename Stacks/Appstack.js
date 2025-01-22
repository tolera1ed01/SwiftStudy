import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../Screens/LoginScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return(
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false, headerMode: "none"}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default AppStack;