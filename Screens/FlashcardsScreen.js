import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import AntDesign from '@expo/vector-icons/AntDesign';
import { FlatList } from "react-native-gesture-handler";


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
      onPress={handleCreate}
      >
        <Text style={styles.deckButtonText}>Create</Text>
        </TouchableOpacity>
    </View>
  )

}

function FlashcardsHeaderButton({ onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.CreateButton} onPress={onPress}>
      <AntDesign name="plus" size={30} color={colors.primary} />
    </TouchableOpacity>
  );
}

function ReviseCardsButton({ onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.CreateButton} onPress={onPress}>
      <AntDesign name="playcircleo" size={26} color={colors.primary} />
    </TouchableOpacity>
  )
}

function FlashcardsScreen({ route }) {
  const { deckId, deckTitle, flashcards } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const user = auth.currentUser;
  const uid = user.uid;
  const [data, setData] = useState(flashcards);
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
          <FlashcardsHeaderButton onPress={() => setIsVisible(!isVisible)}/>
          <ReviseCardsButton onPress={() => navigation.navigate("ReviseScreen", { deckId, deckTitle, flashcards })}/>
        </>
      ),
      title: deckTitle,
    });
  }, [navigation, deckId, deckTitle, flashcards]);

  useEffect(() => {
    const unsub = onSnapshot(deckRef, (snap) => {
      const deck = snap.data();
      setData(deck?.flashcards || []);                  
    });
    return () => unsub();
  }, [uid, deckId]);


  const Flashcard = ({ flashcard }) => (
    <TouchableOpacity style={styles.Deck}>
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
