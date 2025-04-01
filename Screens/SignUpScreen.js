import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../stylesheet";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useTheme } from "@react-navigation/native";
import { auth, db } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";


export default function SignUpScreen() {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const signUpHandler = async () => {
    const usernameReqs = /^[a-zA-Z0-9_]{4,12}$/; 
    if (!usernameReqs.test(username)) {
      Alert.alert(
        "Invalid Username",
        "Username must be between 4 and 12 characters and contain only letters and numbers."
      );
      return; 
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
        Alert.alert("Signup Successful!", "Account created successfully.");
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      await sendEmailVerification(auth.currentUser)
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        username: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
      });
      navigation.navigate("LoginScreen");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        Alert.alert(
          "Invalid Email",
          "Please enter a valid email address."
        );
      } else if (error.code === "auth/invalid-password") {
        Alert.alert(
          "Invalid password",
          "Password must be between 8 and 24 characters long, contain an uppercase letter, symbol and number."
        );
      } else {
        Alert.alert("SignUp error:",error.message);
      }
    }
  };

    const navigation = useNavigation();
    const { colors }  = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.BackArrow} 
      onPress={() => { navigation.goBack("LoginScreen") }}>
      <AntDesign name="arrowleft" size={30} color={colors.primary} />
    </TouchableOpacity>
    <Text style={[styles.createAccountTitle, {color: colors.text}]}>Create Account</Text>
    <View style={styles.inputContainer}>
      <TextInput 
      style={[styles.inputBox, {backgroundColor: colors.card, color: colors.text}]}
      placeholder="Username"
      placeholderTextColor={ colors.placeholderText }
      onChangeText={(text) => setUsername(text)}
      value={username}
      />
      <TextInput 
      style={[styles.inputBox, {backgroundColor: colors.card, color: colors.text}]}
      placeholder="Email"
      placeholderTextColor={ colors.placeholderText }
      onChangeText={(text) => setEmail(text)}
      value={email}
      />
    <TouchableOpacity 
        style={styles.eyeIcon}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
      >
        <AntDesign
          name={isPasswordVisible ? "eye" : "eyeo"} 
          size={24} 
          color={isPasswordVisible ? colors.primary : colors.placeholderText} 
        />
      </TouchableOpacity>
      <TextInput 
      style={[styles.inputBox, {backgroundColor: colors.card, color: colors.text}]}
      placeholder="Password"
      placeholderTextColor={ colors.placeholderText }
      onChangeText={(text) => setPassword(text)}
      value={password}
      secureTextEntry={!isPasswordVisible}
      />

    </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary }, {borderColor: "#00e4e4" }]} onPress={signUpHandler}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}