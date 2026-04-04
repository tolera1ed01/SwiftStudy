import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CreateScreen from "./FlashcardsScreen"
import styles from '../stylesheet';
import { Button, Touchable, TouchableOpacity, View, Text } from 'react-native';
import LibraryScreen from "./LibraryScreen";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

function FlashcardTemplate({ onCreate }) {
  const { colors } = useTheme();
  const [Front, setFront] = useState("");
  const [Back, setBack] = useState("");

   const handleCreate = () => {
    if (!Front.trim() || !Back.trim()) return;
    onCreate(Front, Back);  
    setFront(""); 
    setBack("");
  };


  return (
    <View style={ styles.DeckTemplate}  >
      <TextInput 
      style={styles.deckTemplateTitle}
      placeholder="Flashcard Front"
      placeholderTextColor={"white"}
      value={Front}
      onChangeText={(text) => setFront(text)}
      />
      <TextInput 
      style={styles.deckTemplateDescription}
      placeholder="Flashcard Back"
      placeholderTextColor={"white"}
      value={Back}
      onChangeText={(text) => setBack(text)}
      />
      <TouchableOpacity style={[styles.createDeckButton, {backgroundColor: colors.primary}]} 
      activeOpacity={0.8}
      onPress={handleCreate}
      >
        <Text style={styles.deckButtonText}>Create</Text>
        </TouchableOpacity>
    </View>
  )

}


function DeckTemplate( { onCreate } ) {

  const { colors } = useTheme();
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  
  const handleCreate = () => {
    if (!deckTitle.trim() || !deckDescription.trim()) return;
    onCreate(deckTitle, deckDescription); 
    setDeckTitle(""); 
    setDeckDescription("");
  };
  
  

  return (
    <View style={ styles.DeckTemplate}  >
      <TextInput 
      style={styles.deckTemplateTitle}
      placeholder="Deck Title"
      placeholderTextColor={"white"}
      value={deckTitle}
      onChangeText={(text) => setDeckTitle(text)}
      />
      <TextInput 
      style={styles.deckTemplateDescription}
      placeholder="Deck description..."
      placeholderTextColor={"white"}
      value={deckDescription}
      onChangeText={(text) => setDeckDescription(text)}
      />
      <TouchableOpacity style={[styles.createDeckButton, {backgroundColor: colors.primary}]} 
      activeOpacity={0.8}
      onPress={handleCreate}
      >
        <Text style={styles.deckButtonText} >Create</Text>
        </TouchableOpacity>
    </View>
  )
}


function Navbar() {
  const { colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

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
        <Tab.Screen
        name="Library"
        children={() => (
          <LibraryScreen isVisible={isVisible} />
        )}
        options={{
          headerRight: () => (
            <TouchableOpacity style={styles.CreateButton} 
            onPress={() => setIsVisible(!isVisible)}  
            activeOpacity={0.8}
            >
            <AntDesign name="plus" size={30} color={colors.primary} />
          </TouchableOpacity>
          )
        }}
        />
      </Tab.Navigator>
    </View>
  )
}

export { Navbar, DeckTemplate, FlashcardTemplate };



