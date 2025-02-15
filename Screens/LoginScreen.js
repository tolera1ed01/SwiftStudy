import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";



export default function LoginScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        navigation.navigate("HomeScreen")
    } catch(error) {
      Alert.alert("Login error:",error.message)
    }
  }

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
        <Text style={[styles.appName, { color: colors.text }]}>Welcome to SwiftStudy!</Text>
        <Text style={[styles.loginTitle, { color: colors.text }]}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputBox, {backgroundColor: colors.card, color: colors.text}]}
            placeholder="Email"
            placeholderTextColor={ colors.placeholderText }
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={[styles.inputBox, {backgroundColor: colors.card, color: colors.text}]}
            placeholder="Password"
            placeholderTextColor={ colors.placeholderText }
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: colors.primary }, {borderColor: "#00e4e4"}]}
          onPress={loginHandler}
          >
            <Text style={styles.buttonText}>Log in</Text>
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