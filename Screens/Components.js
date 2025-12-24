import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import styles from '../stylesheet';
import { Button, Touchable, TouchableOpacity, View, Text } from 'react-native';
import LibraryScreen from "./LibraryScreen";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebaseConfig';

const Tab = createBottomTabNavigator();



function DeckTemplate() {

  const { colors } = useTheme();
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  

  async function AddEmptyDeckToDatabase() {
    const user = auth.currentUser;
    const uid = user.uid;
    const decksRef = collection(doc(collection(db, "users"), uid), "decks");

    try {
      const doc = await addDoc(decksRef, {
        deckTitle,
        deckDescription,
        flashcardIds: [],
        createdAt: serverTimestamp(),
      });
      Alert.alert("Deck created with id:", doc.id);
    } catch (error) {
      Alert.alert("Error adding deck:", error);
    }
  }

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
      onPress={AddEmptyDeckToDatabase}
      >
        <Text style={styles.deckButtonText} >Create</Text>
        </TouchableOpacity>
    </View>
  )
}


function Navbar() {
  const { colors } = useTheme();
  const [isVisible, setIsVisble] = useState(false);

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
            <TouchableOpacity style={styles.CreateButton} onPress={() => setIsVisble(!isVisible)}  >
            <AntDesign name="plus" size={30} color={colors.primary} />
          </TouchableOpacity>
          )
        }}
        />
      </Tab.Navigator>
    </View>
  )
}

export { Navbar, DeckTemplate };



