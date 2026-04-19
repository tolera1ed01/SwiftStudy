import React, { useEffect, useState } from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { collection, doc, query, onSnapshot, where, orderBy, limit, collectionGroup, getDocs } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { db, auth } from "../firebaseConfig";

export default function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const uid = auth.currentUser.uid;
  const [recentDecks, setRecentDecks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


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

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
    const snap = await getDocs(collectionGroup(db, "decks"));
    const term = text.toLowerCase();
    const matched = [];
    snap.forEach((d) => {
      const deck = {id: d.id, ...d.data()};
      const inTitle = deck.deckTitle?.toLowerCase().includes(term);
      const inCards = deck.flashcards.some(
        (c) => c.front?.toLowerCase().includes(term) || c.back?.toLowerCase().includes(term)
      );
      if (inTitle || inCards) matched.push(deck);
    });
    setSearchResults(matched);
    } catch (error) {
      console.error("Search error:", error.message);
    }
    setSearching(false);
  };


  return (
    <SafeAreaView style={[styles.homeContainer, { backgroundColor: colors.background }]}>
      <View style={styles.searchBarContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <TextInput
            style={[styles.searchBarInput, { color: colors.text }]}
            placeholder="Search all flashcards..."
            placeholderTextColor={colors.placeholderText}
            value={searchQuery}
            onChangeText={(handleSearch)}
          />
        </View>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id }
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10}}
          ListEmptyComponent={
            !searching && (
              <Text style={[styles.recentDeckEmpty, { color: colors.text } ]} >No results found</Text>
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.searchResultCard, { backgroundColor: colors.card }]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("FlashcardsScreen", {
                deckId: item.id,
                deckTitle: item.deckTitle,
              })}
            >
              <Text style={[styles.recentDeckTitle, { color: colors.text }]}>{item.deckTitle}</Text>
              {item.deckDescription ? (
                <Text style={{ color: colors.text, opacity: 0.5, fontSize: 13, marginTop: 4 }} numberOfLines={1} >
                  {item.deckDescription}
                </Text>
              ) : null}
            </TouchableOpacity>
          )}
        />
      </View>
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