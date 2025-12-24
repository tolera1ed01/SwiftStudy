import React, { useEffect, useState } from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { DeckTemplate } from "./Components";
import { collection, doc, query, onSnapshot } from "firebase/firestore";
import { db, auth } from '../firebaseConfig';

export default function LibraryScreen({isVisible}) {
  const user = auth.currentUser;
  const uid = user.uid;
  const [data, setData] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {

    const decksRef = collection(doc(collection(db, "users"), uid), "decks");
    const q = query(decksRef);

    const unsub = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((snap) => {
      list.push({ id: snap.id, ...snap.data() }); //useEffect is for getting decks and adding them to the list
    });
    setData(list);
  });
  return () => unsub();
}, [uid]);


  const Deck = ({title}) => (
    <View style={ styles.Deck } >
      <Text style={ styles.deckTitle }>{title}</Text>
    </View>
  );


  return (
    <SafeAreaView style={[styles.LibraryContainer, { backgroundColor: colors.background }]}>
      {isVisible && <DeckTemplate/>}
      <FlatList
        data={data}
        renderItem={({ item }) => <Deck title={item.deckTitle} />}
        keyExtractor={(item) => item.id} 
      >
      </FlatList>
    </SafeAreaView>
  );
}
