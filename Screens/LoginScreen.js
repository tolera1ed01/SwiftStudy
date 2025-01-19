import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import styles from "../stylesheet";

const LoginImage = require("../assets/images/LoginImage.jpg");






const LoginScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
      <Text style={styles.appName}>Welcome to SwiftStudy!</Text>
      <Text style={{position: "relative", bottom: 275, right: 30, fontSize: 45, fontWeight: "bold", fontFamily: "",}}>Login</Text>
      <View style= {styles.imageContainer}>
        <Image source={LoginImage} style={{ width:200, height:200, position: "relative",  }} />
      </View>
    </View>
  )
}


export default LoginScreen;
