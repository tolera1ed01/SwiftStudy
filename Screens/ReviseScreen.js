import { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "../stylesheet";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";


export default function ReviseScreen( {route} ) {

  const { colors } = useTheme();
  const { deckId, deckTitle, flashcards } = route.params
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);

  useEffect( () => {
    const uid = auth.currentUser.uid;
    const deckRef = doc(db, "users", uid, "decks", deckId);
    updateDoc(deckRef, { lastRevised: serverTimestamp()})
  })
  
  useLayoutEffect( () => {
    navigation.setOptions({
      title: deckTitle
    });
  }, [navigation, deckTitle]);

  const goBack = () => {
    setIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
    setShowFront(true);
  };

  const goForward = () => {
    setIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
  };

  const card = flashcards[index]

  if (!flashcards || flashcards.length === 0) {
    return (
      <SafeAreaView style={[styles.reviseScreenContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.noCardsText, {color: colors.text}]} >No flashcards in this deck</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.reviseScreenContainer, { backgroundColor: colors.background }]}>
      <View style={styles.reviseRow}>
        <TouchableOpacity 
        activeOpacity={0.8} 
        style={[styles.reviseCard, { backgroundColor: colors.card }]} 
        onPress={() => setShowFront((prevShowFront) => !prevShowFront)}>
          <Text style={[styles.reviseCardText, { color: colors.text }]}>
            {showFront ? card.front : card.back}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reviseArrowsRow}>
      <TouchableOpacity onPress={goBack} style={styles.reviseArrowButton}>
        <AntDesign name="left" size={30} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={goForward} style={styles.reviseArrowButton}>
        <AntDesign name="right" size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>

      <Text style={[styles.reviseCounterText, {color: colors.text}]}>
        {index + 1} / {flashcards.length}
      </Text>
    </SafeAreaView>
  );
}