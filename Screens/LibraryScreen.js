import React, { useEffect, useState } from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Touchable } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { DeckTemplate } from "./Components";
import { collection, doc, query, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebaseConfig';

export default function LibraryScreen({isVisible}) {
  const user = auth.currentUser;
  const uid = user.uid;
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();

  async function AddEmptyDeckToDatabase(deckTitle, deckDescription) {
    const decksRef = collection(doc(collection(db, "users"), uid), "decks");

    try {
      const docRef = await addDoc(decksRef, {
        deckTitle,
        deckDescription,
        flashcards: [], //empty array for flashcards to be stored at
        createdAt: serverTimestamp(),
        lastRevised: null, //the time last revised which will update when the user has opened a deck in the revise screen
        averageScore: null, //the amount of flashcards the user remembered on average in that deck
        lastScoreUpdate: null //the last time the score was changed, like the score decaying over time to encourage repeated revision
      });
      Alert.alert("Deck created with id:", docRef.id);
    } catch (error) {
      Alert.alert("Error adding deck:", error);
    }
  }


  useEffect(() => {

    const decksRef = collection(doc(collection(db, "users"), uid), "decks");
    const q = query(decksRef);

    const unsub = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((snap) => {
      list.push({ id: snap.id, ...snap.data() }); //useEffect is for getting decks and adding them to the list
    });
    setData(list);});
    return () => unsub(); //stops listening for changes to decks once the screen is not rendered anymore
  }, [uid]);



  const Deck = ({ deck }) => ( // had to destructure for the whole deck to get more than one prop, title and id
    <TouchableOpacity style={[styles.Deck, { backgroundColor: colors.card}]}
    activeOpacity={0.8}
      onPress={() => navigation.navigate("FlashcardsScreen", {
        deckId: deck.id,
        deckTitle: deck.deckTitle, //navigate to the flashcard screen with the right deck and also deck title to display in the top left corner
      })}>
      <Text style={ [styles.deckTitle, {color: colors.text}] } numberOfLines={2} ellipsizeMode="tail">{ deck.deckTitle }</Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={[styles.LibraryContainer, { backgroundColor: colors.background }]}>
      {isVisible && <DeckTemplate onCreate={AddEmptyDeckToDatabase} />}
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({ item }) => <Deck deck={item} />}
        keyExtractor={(item) => item.id} 
      >
      </FlatList>
    </SafeAreaView>
  );
}
