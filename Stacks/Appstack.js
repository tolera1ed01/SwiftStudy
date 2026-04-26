import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from "../Screens/SignUpScreen";
import { SwiftstudyLightTheme, SwiftstudyTheme } from "../stylesheet";
import { StatusBar } from "react-native";
import { Navbar } from "../Screens/Components";
import { FlashcardsScreen } from "../Screens/FlashcardsScreen";
import ReviseScreen from "../Screens/ReviseScreen";
import { useState } from "react";


const Stack = createStackNavigator();



export default function AppStack() {

  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? SwiftstudyTheme : SwiftstudyLightTheme;
  const colors = theme.colors;

  const toggleTheme = () => setIsDark((prev) => !prev)
// any screens here in the stack are screens that cant be directly navigated to through the navigation bar of the homescreen and thus needs an alternative location(here) to be accessed
  return(
    <>
      <NavigationContainer theme={theme}> 
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"}
          translucent={true}  
          backgroundColor={isDark ? "#18191a" : colors.card }
        /> 
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{
          headerStyle: {backgroundColor: isDark ? "#18191a" : colors.card}}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" children={() => (
              <Navbar isDark={isDark} toggleTheme={toggleTheme} /> )} options={{ headerShown: false }} />
          <Stack.Screen name="FlashcardsScreen" component={FlashcardsScreen}/>
          <Stack.Screen name="ReviseScreen" component={ReviseScreen}/> 
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
