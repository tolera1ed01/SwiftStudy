import React from "react"; 
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";

export default function SettingsScreen() {
  const { colors } = useTheme();



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
    </SafeAreaView>
  );
}