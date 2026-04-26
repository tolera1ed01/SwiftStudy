import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../stylesheet";
import { useNavigation, useTheme } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AntDesign from '@expo/vector-icons/AntDesign';



export default function LoginScreen() {
  const navigation = useNavigation();      //defining important variables/functions to be used in the login screen
  const { colors, dark } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginHandler = async () => {    //An asynchronous function which will wait for the email and password to authorize the user
    try {
      await signInWithEmailAndPassword(auth, email, password)
        navigation.navigate("HomeScreen") //Takes user to HomeScreen upon successful login
    } catch(error) {
      Alert.alert("Invalid Credentials, check the entered email and or password") 
    }
  }

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>   
        <Text style={[styles.appName, { color: colors.text }]}>Welcome to SwiftStudy!</Text> 
        <Text style={[styles.loginTitle, { color: colors.text }]}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.inputBox, {backgroundColor: dark ? "#18191a" : colors.card, color: colors.text}]}
            placeholder="Email"
            placeholderTextColor={ colors.placeholderText }
            value={email}
            onChangeText={(text) => setEmail(text)} //Sets the user's input in the email text field to the email that will be checked with firebase authorization
          />
        <TouchableOpacity 
        style={[styles.eyeIcon, { bottom: "8.75%" } ]}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)} //Touchable opacity which has an AntDesign SVG for indicating when password visibilty is turned on
      >
        <AntDesign
          name={isPasswordVisible ? "eye" : "eyeo"} 
          size={24} 
          color={isPasswordVisible ? colors.primary : colors.placeholderText}    //when isPasswordVisibile is true or false will change color and icon to indicate the password visibility is toggled
        />
      </TouchableOpacity>
          <TextInput
            style={[styles.inputBox, {backgroundColor: dark ? "#18191a" : colors.card, color: colors.text}]}
            placeholder="Password"
            placeholderTextColor={ colors.placeholderText }
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!isPasswordVisible}  //Actually toggles if you can see the password being entered or not
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: colors.primary }, {borderColor: "#00e4e4"}]}
          onPress={loginHandler} //When the login button is pressed it calls the loginHandler function which logs in a user if the account details are correct
          >
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpText}>
          <Text style={{ color: colors.text }}>Don't have an account? </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate("SignUpScreen")}  //Button to navigate the user to the signup screen for them to make an account if they dont have have an account
            style={{ marginLeft: "30%" }} 
          >
            <Text style={{color: colors.primary}}>Sign up</Text> 
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}