import { Dimensions } from 'react-native';
import { StyleSheet, Text, View } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth * 1,
    height: windowHeight * 1.2,
  },
  appName: {
    bottom: 200,
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "",
    padding: 10,
    borderBottomWidth: 2,
    width: "100%",
  },
  imageContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 400,
    left: 0,
    right: 0,
  },
  loginTitle: {
    position: "relative", 
    marginTop: "50%",
    bottom: 225, 
    right: 100, 
    fontSize: 45, 
    fontWeight: "bold", 
    fontFamily: "",
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
    bottom: 200,
    width: "350",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
});

export default styles;