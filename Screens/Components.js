import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import styles from '../stylesheet';
import { View } from 'react-native';
import LibraryScreen from "./LibraryScreen";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();



function Navbar() {
  const { colors } = useTheme();
  return(
    <View style={ styles.navbar }>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name == "Library") {
            iconName = focused ? "folderopen" : "folder1";
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          width: "100%",
          height: "70",
          borderTopWidth: 0,
          paddingTop: 5,
        }
      })
      } 
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Library" component={LibraryScreen}/>
      </Tab.Navigator>
    </View>
  )
}

export { Navbar };



