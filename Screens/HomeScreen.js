import React, { useEffect, useState } from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { collection, doc, query, onSnapshot, where, orderBy, limit } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { db, auth } from "../firebaseConfig";

export default function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const uid = auth.currentUser.uid;
  const [recentDecks, setRecentDecks] = useState([]);

  useEffect(() => {
    const decksRef = collection(doc(collection(db, "users"), uid), "decks");
    const q = query(
      decksRef,
      where("lastRevised", "!=", null), 
      orderBy("lastRevised", "desc"), 
      limit(5)
    )
    const unsub = onSnapshot(q, (querySnapshot) => {
    const list = [];
    querySnapshot.forEach((snap) => list.push({ id: snap.id, ...snap.data() }));
    setRecentDecks(list);
  });
  return () => unsub();
  }, [uid]);

  const RecentDeck = ({ deck }) => (
    <TouchableOpacity
      style={[styles.recentDeckCard, { backgroundColor: colors.card }]}                                              
      activeOpacity={0.8}
      onPress={() => navigation.navigate("FlashcardsScreen", {
        deckId: deck.id,
        deckTitle: deck.deckTitle,                                                                                   
      })}
    >                                                                                                                
      <Text style={[styles.recentDeckTitle, { color: colors.text }]} numberOfLines={2}>
        {deck.deckTitle}
      </Text>
    </TouchableOpacity>                                                                                              
  );


  return (
    <SafeAreaView style={[styles.homeContainer, { backgroundColor: colors.background }]}>
      <Text style={[[styles.recentlyRevisedTitle, { color: colors.text }]]}>Recently Revised</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentDecks}
        renderItem={({ item }) => <RecentDeck deck = {item}/>}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recentDecksList}
        ListEmptyComponent={
          <Text style={[styles.recentDeckEmpty, { color: colors.text }]}>No decks revised yet</Text>
        }
      >

      </FlatList>
    
    </SafeAreaView>
  );
}