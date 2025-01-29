import React from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useTheme } from "@react-navigation/native";

export default function SignUpScreen() {

    const navigation = useNavigation();
    const { colors } = useTheme();


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.BackArrow} 
      onPress={() => { navigation.goBack("LoginScreen") }}>
      <AntDesign name="arrowleft" size={30} color={colors.primary} />
    </TouchableOpacity>
    <Text style={styles.createAccountTitle}>Create Account</Text>
    <View style={styles.inputContainer}>
      <TextInput 
      style={styles.inputBox}
      placeholder="Username"
      />
            <TextInput 
      style={styles.inputBox}
      placeholder="Email"
      />
            <TextInput 
      style={styles.inputBox}
      placeholder="Password"
      />
    </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}