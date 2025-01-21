import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput } from "react-native";
import styles from "../stylesheet";






const LoginScreen = () => {
  return (
      <SafeAreaView style={styles.container}> 
        <Text style={styles.appName}>Welcome to SwiftStudy!</Text>
        <Text style={styles.loginTitle}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Username"
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
          />
        </View>
      </SafeAreaView>
  );
}



export default LoginScreen;
