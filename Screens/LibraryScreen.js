import React, { useState } from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { DeckTemplate } from "./Components";

export default function LibraryScreen({isVisible}) {
  const { colors } = useTheme();



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {isVisible && <DeckTemplate/>}
      <FlatList>
        
      </FlatList>
    </SafeAreaView>
  );
}
