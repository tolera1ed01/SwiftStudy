import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import AntDesign from '@expo/vector-icons/AntDesign';
import { FlatList } from "react-native-gesture-handler";
import { FlashcardTemplate } from "./Components";

function FlashcardsHeaderButton({ onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.CreateButton} onPress={onPress} activeOpacity={0.8} >
      <AntDesign name="plus" size={30} color={colors.primary} />
    </TouchableOpacity>
  );
}

function ReviseCardsButton({ onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.CreateButton} onPress={onPress} activeOpacity={0.8} >
      <AntDesign name="playcircleo" size={26} color={colors.primary} />
    </TouchableOpacity>
  )
}

function FlashcardsScreen({ route }) {
  const { deckId, deckTitle } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const user = auth.currentUser;
  const uid = user.uid;
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const deckRef = doc(
    collection(doc(collection(db, "users"), uid), "decks"),
    deckId
  );

  const addFlashcard = async (front, back) => {
    const newCard = { front, back };
    const updated = [...data, newCard];
    setData(updated);
    await updateDoc(deckRef, { flashcards: updated });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <FlashcardsHeaderButton onPress={() => setIsVisible(isVisible => !isVisible)}/>
          <ReviseCardsButton onPress={() => navigation.navigate("ReviseScreen", { deckId, deckTitle, flashcards: data })}/>
        </>
      ),
      title: deckTitle,
    });
  }, [navigation, deckId, deckTitle, data]);

  useEffect(() => {
    const unsub = onSnapshot(deckRef, (snap) => {
      const deck = snap.data();
      setData(deck?.flashcards || []);
    });
    return () => unsub();
  }, [uid, deckId]);


  const Flashcard = ({ flashcard }) => (
    <TouchableOpacity style={styles.Deck} activeOpacity={0.8} >
      <Text style={styles.deckTitle}>{flashcard.front}</Text>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={[styles.LibraryContainer, { backgroundColor: colors.background }]}>
      {isVisible && <FlashcardTemplate onCreate={addFlashcard} />}
      <FlatList
        data={data}
        renderItem={({ item }) => <Flashcard flashcard={item} />}
        keyExtractor={(_, index) => index.toString()}
      >
      </FlatList>
    </SafeAreaView>
  );
}

export { FlashcardsScreen, FlashcardsHeaderButton };
