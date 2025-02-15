import { Dimensions } from 'react-native';
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme, useNavigation, DarkTheme, } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SwiftstudyTheme = {
  ...DefaultTheme,
  DarkTheme: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#00001C",
    primary: "#00c3e6",
    card: "#000022",
    text: "#F6F8FF",
    placeholderText: "#404040",
  }
};

export { SwiftstudyTheme };





const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    maxWidth: windowWidth * 1,
    maxHeight: windowHeight * 1.04,
    paddingHorizontal: "10%",
  },
  appName: {
    position: "absolute",
    bottom: windowHeight * 0.875,
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "",
    padding: 10,
    width: "100%",
    textAlign: "center",
  },
  imageContainer: {
    justifyContent: "center", 
    alignItems: "center",
    position: "absolute",
    bottom: 400,
    left: 0,
    right: 0,
  },
  loginTitle: {
    position: "relative", 
    marginTop: "70%",
    bottom: "30%", 
    right: "40%", 
    fontWeight: "bold", 
    fontFamily: "",
    fontSize: 40,
  },
  inputBox: {
    borderColor: "#404040",
    padding: 10,
    borderRadius: 20,
    width: "90%",
    height: "50",
    marginTop: 20,
    borderWidth: 1.25,
  },
  inputContainer: {
    position: "relative",
    bottom: "25%",
    width: windowWidth * 0.9,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 20, 
    padding: 18,
    width: windowWidth * 0.9,
    height: windowHeight * 0.08,
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 19,
  },
  buttonContainer: {
    position: "relative",
    bottom: windowHeight * 0.15,
  },
  signUpText: {
    position: "absolute",
    top: "90%",
  },
  BackArrow: {
    position: "relative",
    padding: 20,
    right: windowWidth * 0.4,
    bottom: windowHeight * 0.1,
  },
  createAccountTitle: {
    position: "relative", 
    marginTop: "70%",
    bottom: "30%", 
    right: "20%", 
    fontWeight: "bold", 
    fontFamily: "",
    fontSize: 35,
    marginLeft: "5%",
  },
  eyeIcon: {
    position: "absolute",
    zIndex: 1,
    right: windowWidth * 0.1,
    bottom: "6%",
  },
});

export default styles;