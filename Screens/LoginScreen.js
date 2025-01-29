import React from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";





export default function LoginScreen() {

  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
        <Text style={[styles.appName, { color: colors.text }]}>Welcome to SwiftStudy!</Text>
        <Text style={[styles.loginTitle, { color: colors.text }]}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputBox, {backgroundColor: colors.card, color: colors.text}]}
            placeholder="Email"
            placeholderTextColor={ colors.placeholderText }
          />
          <TextInput
            style={[styles.inputBox, {backgroundColor: colors.card, color: colors.text}]}
            placeholder="Password"
            placeholderTextColor={ colors.placeholderText }
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpText}>
          <Text style={{ color: colors.text }}>Don't have an account? </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate("SignUpScreen")} 
            style={{ marginLeft: "30%" }} 
          >
            <Text style={{color: colors.primary}}>Sign up</Text> 
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}