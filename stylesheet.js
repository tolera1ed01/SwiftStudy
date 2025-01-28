import { Dimensions } from 'react-native';
import { StyleSheet, Text, View } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    borderBottomWidth: 2,
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
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "90%",
    height: "50",
    marginTop: 20,
  },
  inputContainer: {
    position: "relative",
    bottom: "25%",
    width: windowWidth * 0.85,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: '#2F92B8',
    borderRadius: 50, 
    padding: 20,
    width: "125",
    height: "70",
    textAlign: "center",
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonContainer: {
    position: "relative",
    left: windowWidth * 0.2,
    bottom: windowHeight * 0.15,
  },
  signUpText: {
    color: "#A9A9A9",
    position: "absolute",
    top: "90%",
  },
  BackArrow: {
    position: "absolute",
    bottom: windowHeight * 0.875,
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "",
    padding: 10,
    width: "110%",
    textAlign: "center",
  },
  createAccountTitle: {
    position: "relative", 
    marginTop: "70%",
    bottom: "30%", 
    right: "20%", 
    fontWeight: "bold", 
    fontFamily: "",
    fontSize: 35,
  },
});

export default styles;