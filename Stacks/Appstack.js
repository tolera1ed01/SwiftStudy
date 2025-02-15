import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from "../Screens/SignUpScreen";
import HomeScreen from "../Screens/HomeScreen";
import { SwiftstudyTheme } from "../stylesheet";
import { StatusBar } from "react-native";


const Stack = createStackNavigator();

export default function AppStack() {
  return(
    <>
      <StatusBar barStyle="light-content" 
      translucent={true} 
      backgroundColor="transparent"
      /> 
      <NavigationContainer theme={SwiftstudyTheme}> 
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}