import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { collection, doc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
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

function OptionsButton({ onRename, onDelete }) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <>
      <TouchableOpacity style={styles.CreateButton} onPress={toggleMenu} activeOpacity={0.8} >
      <AntDesign name="ellipsis1" size={26} color={colors.primary} />
      </TouchableOpacity>

      {open && (
        <View style={styles.optionsMenu}>
          <TouchableOpacity
            style={styles.optionsMenuItem}
            onPress={() => {
              setOpen(false);
              onRename();
            }}>
            <Text style={styles.optionsMenuText}>Rename deck</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionsMenuItem}
            onPress={() => {
              setOpen(false);
              onDelete && onDelete();
            }}>
            <Text style={styles.optionsMenuText}>Delete deck</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

function ReviseCardsButton({ onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.CreateButton} onPress={onPress} activeOpacity={0.8} >
      <AntDesign name="playcircleo" size={26} color={colors.primary} />
    </TouchableOpacity>
  );
}

function FlashcardsScreen({ route }) {
  const { deckId, deckTitle } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const user = auth.currentUser;
  const uid = user.uid;
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [renameVisible, setRenameVisible] = useState(false);
  const [newTitle, setNewTitle] = useState(deckTitle);

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

  const handleRenameDeck = async () => {
    try {
      await updateDoc(deckRef, { deckTitle: newTitle });
      setRenameVisible(false);
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };

  const handleDeleteDeck = async () => {
    try {
      await deleteDoc(deckRef);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Couldn't delete deck, Error:", error.message)
    }
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <FlashcardsHeaderButton onPress={() => setIsVisible(isVisible => !isVisible)}/>
          <ReviseCardsButton onPress={() => navigation.navigate("ReviseScreen", { deckId, deckTitle, flashcards: data })}/>
          <OptionsButton onRename={() => setRenameVisible(true)} onDelete={handleDeleteDeck} />
        </>
      ),
      title: deckTitle,
    });
  }, [navigation, deckId, deckTitle, data, handleDeleteDeck]);

  useEffect(() => {
    const unsub = onSnapshot(deckRef, (snap) => {
      const deck = snap.data();
      setData(deck?.flashcards || []);
    });
    return () => unsub();
  }, [uid, deckId]);


  const deleteFlashcard = async (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
    await updateDoc(deckRef, { flashcards: updated });
  };

  const Flashcard = ({ flashcard, onDelete }) => (
    <TouchableOpacity style={[styles.Deck, { backgroundColor: colors.card }]} >
      <Text style={[styles.deckTitle, {color: colors.text}]}>{flashcard.front}</Text>
      <TouchableOpacity style={styles.flashcardDeleteButton} onPress={onDelete} activeOpacity={0.8}>
        <AntDesign name="close" size={16} color={colors.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={[styles.LibraryContainer, { backgroundColor: colors.background }]}>
      {isVisible && <FlashcardTemplate onCreate={addFlashcard} />}
      <FlatList
        data={data}
        renderItem={({ item, index }) => <Flashcard flashcard={item} onDelete={() => Alert.alert("Delete flashcard", "Are you sure?", [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => deleteFlashcard(index) }])} />}
        keyExtractor={(_, index) => index.toString()}
      >
      </FlatList>

      {renameVisible && (
        <View style={styles.renameOverlay}>
          <View style={styles.renameBox}>
            <Text style={styles.renameTitle}>Rename deck</Text>
            <TextInput
              style={styles.renameInput}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="New deck name"
              placeholderTextColor="#888"/>
            <View style={styles.renameButtonsRow}>
              <TouchableOpacity
                style={styles.renameButtonCancel}
                onPress={() => setRenameVisible(false)}>
                <Text style={styles.renameButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.renameButtonSave}
                onPress={handleRenameDeck}>
                <Text style={styles.renameButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export { FlashcardsScreen, FlashcardsHeaderButton };
