import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from "../Screens/SignUpScreen";
import { SwiftstudyTheme } from "../stylesheet";
import { StatusBar } from "react-native";
import { Navbar } from "../Screens/Components";
import { FlashcardsHeaderButton, FlashcardsScreen } from "../Screens/FlashcardsScreen";
import ReviseScreen from "../Screens/ReviseScreen";


const Stack = createStackNavigator();



export default function AppStack() {
  const colors = SwiftstudyTheme.colors;
// any screens here in the stack are screens that cant be directly navigated to through the navigation bar of the homescreen and thus needs an alternative location(here) to be accessed
  return(
    <>
      <NavigationContainer theme={SwiftstudyTheme}> 
        <StatusBar barStyle="light-content" 
          translucent={true}  
          backgroundColor={colors.card}
        /> 
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={Navbar} options={{ headerShown: false }} />
          <Stack.Screen name="FlashcardsScreen" component={FlashcardsScreen}/>
          <Stack.Screen name="ReviseScreen" component={ReviseScreen}/> 
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}