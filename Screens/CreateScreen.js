import React from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

export default function CreateScreen() {
  const { colors } = useTheme();



  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  );
}