import { NavigationContainer, TouchableOpacity } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from "../Screens/SignUpScreen";
import HomeScreen from "../Screens/HomeScreen";
import { SwiftstudyTheme } from "../stylesheet";
import { StatusBar } from "react-native";
import { Navbar } from "../Screens/Components";
import { FlashcardsHeaderButton, FlashcardsScreen } from "../Screens/FlashcardsScreen";


const Stack = createStackNavigator();


export default function AppStack() {

  return(
    <>
      <StatusBar barStyle="light-content" 
      translucent={true} 
      backgroundColor="transparent"
      /> 
      <NavigationContainer theme={SwiftstudyTheme}> 
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={Navbar} options={{ headerShown: false }} />
          <Stack.Screen name="FlashcardsScreen" component={FlashcardsScreen} 
          options={({ route }) => ({ 
            title: route.params.deckTitle,
            headerRight: () => (
              <FlashcardsHeaderButton onPress={() => setIsVisble(!isVisible)}/>
            ),
          })}
/>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}