import React, { useEffect, useState } from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { collection, doc, query, onSnapshot, where, orderBy, limit, collectionGroup, getDocs, getDoc } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { db, auth } from "../firebaseConfig";

const getEffectiveScore = (averageScore, lastScoreUpdate) => {
  if (averageScore === null || lastScoreUpdate === null) return null;
  const days = (Date.now() - lastScoreUpdate.toMillis()) / 86_400_000;
  return averageScore * Math.pow(0.95, days);
};

export default function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const uid = auth.currentUser.uid;
  const [recentDecks, setRecentDecks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lowScoreDecks, setLowScoreDecks] = useState([]);
  const [streak, setStreak] = useState(0);
  const [summary, setSummary] = useState({ totalDecks: 0, totalCards: 0, avgScore: null });


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

  useEffect(() => {
    const decksRef = collection(doc(collection(db, "users"), uid), "decks");
    const q = query(decksRef, where("averageScore", "!=", null));
    const unsub = onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach((snap) => list.push({ id: snap.id, ...snap.data() }));
      const sorted = list.map((deck) => ({ ...deck, effectiveScore: getEffectiveScore(deck.averageScore, deck.lastScoreUpdate) })).sort((a, b) => a.effectiveScore - b.effectiveScore).slice(0, 5);
      setLowScoreDecks(sorted);
    });
    return () => unsub();
  }, [uid]);

  useEffect(() => {
    const decksRef = collection(doc(collection(db, "users"), uid), "decks");
    const unsub = onSnapshot(query(decksRef), (snapshot) => {
      let totalCards = 0;
      let scoredDecks = [];
      snapshot.forEach((snap) => {
        const d = snap.data();
        totalCards += d.flashcards?.length || 0;
        if (d.averageScore != null) scoredDecks.push(d.averageScore);
      });
      const avgScore = scoredDecks.length > 0 ? scoredDecks.reduce((a, b) => a + b, 0) / scoredDecks.length : null;
      setSummary({ totalDecks: snapshot.size, totalCards, avgScore });
    });
    return () => unsub();
  }, [uid]);

  useEffect(() => {
    const updateStreak = async () => {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const data = userSnap.data();
      const today = new Date().toDateString();

      if (!data?.lastActiveDate) {
        await updateDoc(userRef, { currentStreak: 1, lastActiveDate: today });
        setStreak(1);
      } else if (data.lastActiveDate === today) {
        setStreak(data.currentStreak);
      } else {
        const diffDays = Math.floor((Date.now() - new Date(data.lastActiveDate)) / 86_400_000);
        const newStreak = diffDays === 1 ? data.currentStreak + 1 : 1;
        await updateDoc(userRef, { currentStreak: newStreak, lastActiveDate: today });
        setStreak(newStreak);
      }
    };
    updateStreak();
  }, [uid]);

  const LowScoreDeck = ({ deck }) => (
    <TouchableOpacity
      style={[styles.recentDeckCard, { backgroundColor: colors.card }]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("FlashcardsScreen", {
        deckId: deck.id,
        deckTitle: deck.deckTitle,
      })}>
      <Text style={[styles.recentDeckTitle, { color: colors.text }]} numberOfLines={2}>
        {deck.deckTitle}
      </Text>
      <Text style={styles.scoreBadge}>
        {Math.round(deck.effectiveScore * 100)}%
      </Text>
    </TouchableOpacity>
  );

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
      <Text style={[styles.streakText, { color: colors.text }]}>{streak} day streak</Text>
      <View style={styles.summaryRow}>
        <View style={[styles.summaryItem, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryNumber, { color: colors.text }]}>{summary.totalDecks}</Text>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>Decks</Text>
        </View>
        <View style={[styles.summaryItem, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryNumber, { color: colors.text }]}>{summary.totalCards}</Text>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>Cards</Text>
        </View>
        <View style={[styles.summaryItem, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryNumber, { color: colors.text }]}>{summary.avgScore !== null ? `${Math.round(summary.avgScore * 100)}%` : "-"}</Text>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>Avg Score</Text>
        </View>
      </View>
      <Text style={[styles.recentlyRevisedTitle, { color: colors.text }]}>Needs Review</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={lowScoreDecks}
        renderItem={({ item }) => <LowScoreDeck deck={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recentDecksList}
        style={{ flexGrow: 0 }}
        ListEmptyComponent={
          <Text style={[styles.recentDeckEmpty, { color: colors.text }]}>Revise a deck to see scores</Text>
        }
      />
      <Text style={[styles.recentlyRevisedTitle, { color: colors.text, marginTop: 12 }]}>Recently Revised</Text>
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