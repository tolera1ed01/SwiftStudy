import React from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {

    const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
      onPress={() => { navigation.goBack("LoginScreen") }}>
      <AntDesign name="arrowleft" size={30} color="#2F92B8" />
    </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SignUpScreen;