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
        flashcards: [],
        createdAt: serverTimestamp(),
        lastRevised: null,
        averageScore: null,
        lastScoreUpdate: null
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
    return () => unsub();
  }, [uid]);



  const Deck = ({ deck }) => (
    <TouchableOpacity style={[styles.Deck, { backgroundColor: colors.card}]}
    activeOpacity={0.8}
      onPress={() => navigation.navigate("FlashcardsScreen", {
        deckId: deck.id,
        deckTitle: deck.deckTitle,
      })}>
      <Text style={ [styles.deckTitle, {color: colors.text}] }>{ deck.deckTitle }</Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={[styles.LibraryContainer, { backgroundColor: colors.background }]}>
      {isVisible && <DeckTemplate onCreate={AddEmptyDeckToDatabase} />}
      <FlatList
        numColumns={1}
        data={data}
        renderItem={({ item }) => <Deck deck={item} />}
        keyExtractor={(item) => item.id} 
      >
      </FlatList>
    </SafeAreaView>
  );
}
