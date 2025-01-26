import React from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import styles from "../stylesheet";
import { useNavigation } from "@react-navigation/native";
import SignUpScreen from "./SignUpScreen";





const LoginScreen = () => {

  const navigation = useNavigation();

  return (
      <SafeAreaView style={styles.container}> 
        <Text style={styles.appName}>Welcome to SwiftStudy!</Text>
        <Text style={styles.loginTitle}>Login</Text>
        <View style={styles.inputContainer}>
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
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpText}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate("SignUpScreen")} 
            style={{ marginLeft: "25%" }} 
          >
            <Text style={[{ color: "#2F92B8" }]}>Sign up</Text> 
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}



export default LoginScreen;
