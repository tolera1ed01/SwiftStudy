import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import styles from '../stylesheet';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import LibraryScreen from "./LibraryScreen";

const Tab = createBottomTabNavigator();

function Navbar() {
  const { colors } = useTheme();
  return(
    <View style={ styles.navbar }>
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          width: "100%",
          height: "70",
          borderTopWidth: 0,

        }
      }}
      >
        <Tab.Screen name="Homescreen" component={HomeScreen}/>
        <Tab.Screen name="Libraryscreen" component={LibraryScreen}/>
      </Tab.Navigator>
    </View>
  )
}

export { Navbar };